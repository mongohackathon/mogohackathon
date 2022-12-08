import json
from time import time
from typing import Union

import pymongo
from fastapi import APIRouter, Query, Path
from pydantic import BaseModel
from googleapiclient.discovery import build
from google.cloud import talent, talent_v4
from fastapi.responses import JSONResponse
from starlette import status
from ..config.config import PROJECT_ID, TENANT_ID, MONGO_CONNECTION_STRING

jobs = APIRouter()

client_service = build('jobs', 'v3')
project_id = 'projects/' + PROJECT_ID

Client = pymongo.MongoClient(MONGO_CONNECTION_STRING)
db = Client["cts"]
collection = db["jobs"]


class Jobs(BaseModel):
    job_application_url: str
    requisition_id: str
    address: str
    title: str
    description: str
    company_id: str
    company_name: str
    job_poster: str


@jobs.post('/create_jobs/', summary="Create Jobs")
def create_jobs(request: Jobs):
    """
    :param request: job payload
    :return:
    """
    try:
        data = json.loads(request.json())

        client = talent.JobServiceClient()
        uris = [data["job_application_url"]]
        application_info = {"uris": uris}
        addresses = [
            data["address"]
        ]

        job = talent_v4.Job()
        job.company = data["company_id"]
        job.company_display_name = data["company_name"]
        job.requisition_id = data["requisition_id"]
        job.description = data["description"]
        job.application_info = application_info
        job.title = data["title"]
        job.addresses = addresses
        result = client.create_job(parent=PROJECT_ID, job=job)

        data["name"] = result.name
        data["job_poster"] = result.job_poster
        jobs_details = result.name.split("/")
        data["job_id"] = jobs_details[-1]
        collection.insert_one(data)

        return JSONResponse(result.name, status_code=status.HTTP_201_CREATED)

    except Exception as e:
        return JSONResponse(content=str(e), status_code=status.HTTP_403_FORBIDDEN)


@jobs.get('/get_job/', summary="Get jobs details")
def get_job_details(company_id: Union[str, None] = Query(default=None), job_poster:Union[str, None] = Query(default=None)):
    """
    :return:
    """
    timeline = list()
    if job_poster is not None:
        pipeline = [
                {
             '$group': {
                '_id': '$job_poster',
                'jobs_by_poster': {
                '$push': {
                    'job_title': '$title',
                    'company_name': '$company_name',
                    'job_application_url': '$job_application_url',
                    'location': '$address',
                    'poster_avatar': '$poster_avatar'
                }
            }
        }
    }, {
        '$unwind': {
            'path': '$jobs_by_poster'
        }
    }
    ]  
        results = collection.aggregate(pipeline)
        for r in results:
            timeline.append(r)
        #timeline.append(results)
        print("This is result:",results)
        print("This is timeline:",timeline)
        return JSONResponse(content=timeline, status_code=status.HTTP_200_OK)
    else:
        if company_id is None:
            return JSONResponse(content="Please pass company_id", status_code=status.HTTP_400_BAD_REQUEST)
        try:
            results = list()
            client = talent.JobServiceClient()
            filter_ = f'companyName="{project_id}/tenants/{TENANT_ID}/companies/{company_id}"'

            for job in client.list_jobs(parent=PROJECT_ID, filter=filter_):
                payload = dict()
                payload['name'] = job.name
                payload['job_application_url'] = job.application_info.uris[0]
                payload['company_id'] = company_id
                payload['requisition_id'] = job.requisition_id
                payload['title'] = job.title
                payload['address'] = job.addresses[0]
                payload['company_name'] = job.company_display_name
                results.append(payload)

            return JSONResponse(content=results, status_code=status.HTTP_200_OK)

        except Exception as e:
            return JSONResponse(content=str(e), status_code=status.HTTP_403_FORBIDDEN)


@jobs.delete('/delete_job/{job_id}', summary="Delete jobs details",
             status_code=status.HTTP_204_NO_CONTENT)
def delete_jobs_details(job_id: Union[str] = Path()):
    """
    :return:
    """
    client = talent.JobServiceClient()
    try:
        name = client.job_path(PROJECT_ID, TENANT_ID, job_id)
        client.delete_job(name=name)
        collection.delete_one({'job_id': job_id})

    except Exception as e:
        return JSONResponse(content=str(e), status_code=status.HTTP_403_FORBIDDEN)


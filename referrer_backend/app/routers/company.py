import json

import pymongo
import six
from typing import Union

from fastapi import APIRouter, Path
from pydantic import BaseModel
from googleapiclient.discovery import build
from google.cloud import talent
from fastapi.responses import JSONResponse
from starlette import status
from ..config.config import PROJECT_ID, TENANT_ID, MONGO_CONNECTION_STRING

company = APIRouter()

client_service = build('jobs', 'v3')
project_id = 'projects/' + PROJECT_ID

Client = pymongo.MongoClient(MONGO_CONNECTION_STRING)
db = Client["cts"]
collection = db["companies"]


class Company(BaseModel):
    display_name: str
    external_id: str


@company.post('/create_company/', summary="Create company")
def create_company(request: Company):
    """
    :param request: company payload
    :return:
    """
    try:
        request = {'company': json.loads(request.json())}
        result = client_service.projects().companies().create(parent=project_id, body=request).execute()

        name = result["name"]
        company_id = name.split('/')
        collection.insert_one(
            {'name': result['name'], 'displayName': result['displayName'], 'externalId': result['externalId'],
             'company_id': company_id[-1]})

        return JSONResponse(result, status_code=status.HTTP_201_CREATED)

    except Exception as e:
        return JSONResponse(content=str(e), status_code=status.HTTP_403_FORBIDDEN)


@company.get('/get_company/', summary="Get company details")
def get_company_details():
    """
    :return:
    """
    try:
        result = client_service.projects().companies().list(parent=project_id).execute()
        return JSONResponse(result, status_code=status.HTTP_200_OK)

    except Exception as e:
        return JSONResponse(content=str(e), status_code=status.HTTP_403_FORBIDDEN)


@company.delete('/delete_company/{company_id}', summary="Delete company details",
                status_code=status.HTTP_204_NO_CONTENT)
def delete_company_details(company_id: Union[str] = Path()):
    """
    :return:
    """
    client = talent.CompanyServiceClient()
    if isinstance(company_id, six.binary_type):
        company_id = company_id.decode("utf-8")

    try:
        name = client.company_path(PROJECT_ID, TENANT_ID, company_id)
        client.delete_company(name=name)
        collection.delete_one({'company_id': company_id})

    except Exception as e:
        return JSONResponse(content=str(e), status_code=status.HTTP_403_FORBIDDEN)

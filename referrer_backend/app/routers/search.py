from typing import Union
from fastapi import APIRouter, Query
from googleapiclient.discovery import build
from fastapi.responses import JSONResponse
from starlette import status
from ..config.config import PROJECT_ID, TENANT_ID

search = APIRouter()

client_service = build('jobs', 'v3')
project_id = 'projects/' + PROJECT_ID


@search.get('/search_jobs/', summary="Get job details through search")
def get_job_details_through_search(keyword: Union[str, None] = Query(default=None),
                                   company_name: Union[str, None] = Query(default=None),
                                   company_id: Union[str, None] = Query(default=None)):
    """
    :return:
    """
    try:
        if company_name is None:
            job_query = {'query': keyword}
        else:
            job_query = {'company_display_names': company_name}
            company_names = f"{project_id}/tenants/{TENANT_ID}/companies/{company_id}"
            job_query.update({'company_names': [company_names]})
            print(job_query)

        request_metadata = {
            'user_id': 'HashedUserId',
            'session_id': 'HashedSessionId',
            'domain': 'www.google.com'
        }

        request = {
            'search_mode': 'JOB_SEARCH',
            'request_metadata': request_metadata,
            'job_query': job_query,
        }
        result = client_service.projects().jobs().search(
            parent=project_id, body=request).execute()

        return JSONResponse(result, status_code=status.HTTP_200_OK)

    except Exception as e:
        return JSONResponse(content=str(e), status_code=status.HTTP_403_FORBIDDEN)

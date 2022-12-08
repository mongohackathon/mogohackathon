from fastapi import APIRouter
from fastapi.openapi.utils import get_openapi
from starlette.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from .routers import company, jobs, search

app = FastAPI()


def custom_openapi():
    if app.openapi_schema:
        return app.openapi_schema
    openapi_schema = get_openapi(
        title="CTS Dashboard Service",
        version="1.0.0",
        description="CTS API Doc",
        routes=app.routes,
    )
    openapi_schema["info"]["x-logo"] = {
        "url": "https://fastapi.tiangolo.com/img/logo-margin/logo-teal.png"
    }
    app.openapi_schema = openapi_schema
    return app.openapi_schema


app.openapi = custom_openapi

origin = [
    "*"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["DELETE", "GET", "POST", "PUT"],
    allow_headers=["*"],
)

api_router = APIRouter()

api_router.include_router(company.company, prefix='/cts/api/v1', tags=["1. Company"])
api_router.include_router(jobs.jobs, prefix='/cts/api/v1', tags=["2. Job"])
api_router.include_router(search.search, prefix='/cts/api/v1', tags=["3. Search Jobs"])

app.include_router(api_router)

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from mangum import Mangum

from backend.routes import router as api_routes
from backend.report_routes import router as report_router
from backend.auth_routes import router as auth_router
from backend.metrics_routes import router as metrics_router
from backend.logging_utils import get_request_id, logger

app = FastAPI()

@app.middleware("http")
async def add_request_id(request: Request, call_next):
    request_id = get_request_id(request)
    request.state.request_id = request_id
    response = await call_next(request)
    response.headers["x-request-id"] = request_id
    return response

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_routes)
app.include_router(report_router)
app.include_router(auth_router)
app.include_router(metrics_router)

handler = Mangum(app)

logger.info("Lambda handler successfully initialized")

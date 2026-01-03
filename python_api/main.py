from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.routes import router as api_routes
from backend.report_routes import router as report_router
from mangum import Mangum
import logging
from backend.auth_routes import router as auth_router
from backend.metrics_routes import router as metrics_router


logger = logging.getLogger()
logger.setLevel(logging.INFO)

app = FastAPI()

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

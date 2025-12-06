from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import router as api_routes
from report_routes import router as report_router
from mangum import Mangum
import logging

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

handler = Mangum(app)

logger.info("Lambda handler successfully initialized")

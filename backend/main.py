from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
HEAD:python_api/main.py
from routes import router as api_routes

from mangum import Mangum
from python_api.routes import router as api_routes
from python_api.report_routes import router as report_router
73b6dce2 (Initial Lambda deployment: community safety API):backend/main.py

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3002"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

HEAD:python_api/main.py
app.include_router(api_routes)

try:
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

except Exception as e:
    logger.error(f"Error during startup: {e}")
    raise e
73b6dce2 (Initial Lambda deployment: community safety API):backend/main.py

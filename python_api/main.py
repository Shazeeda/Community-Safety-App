from fastapi import FastAPI
from routes import router as api_routes

app = FastAPI()

app.include_router(api_routes)

from fastapi import APIRouter
from pydantic import BaseModel
from backend.utils.auto_response import generate_auto_response

router = APIRouter()

class Report(BaseModel):
    user_id: int
    location: str
    message: str

@router.post("/reports")
async def submit_report(report: Report):
    response = generate_auto_response(report.message)

    return {
        "status": "received",
        "auto_response": response or "Thanks for your report. Stay safe and connected!"
    }

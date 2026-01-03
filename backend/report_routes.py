import time
from fastapi import APIRouter, Depends, HTTPException, Request
from pydantic import BaseModel, Field, ConfigDict

from backend.utils.auto_response import generate_auto_response
from backend.auth import get_current_user
from backend.store import REPORTS
from backend.logging_utils import logger

router = APIRouter()


class ReportCreate(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    user_id: int = Field(..., ge=1)
    location: str = Field(..., min_length=2, max_length=120)
    message: str = Field(..., min_length=5, max_length=1000)
    category: str | None = None
    severity: int | None = Field(default=None, ge=1, le=5)


@router.post("/reports")
async def submit_report(
    report: ReportCreate,
    request: Request,
    user=Depends(get_current_user),
):
    if report.user_id != user["user_id"]:
        raise HTTPException(status_code=403, detail="user_id must match authenticated user")

    request_id = getattr(request.state, "request_id", "unknown")

    logger.info(
        "report_submitted",
        extra={
            "request_id": request_id,
            "user_id": user["user_id"],
            "role": user["role"],
            "location": report.location,
            "category": report.category or "uncategorized",
            "severity": report.severity or 1,
        },
    )

    report_id = len(REPORTS) + 1

    record = {
        "report_id": report_id,
        "user_id": report.user_id,
        "location": report.location,
        "message": report.message,
        "category": report.category or "uncategorized",
        "severity": report.severity or 1,
        "created_at": int(time.time()),
    }
    REPORTS.append(record)

    response = generate_auto_response(report.message)

    return {
        "status": "received",
        "report_id": report_id,
        "auto_response": response or "Thanks for your report. Stay safe and connected!",
        "stored": True,
        "report_count": len(REPORTS),
        "request_id": request_id,
    }

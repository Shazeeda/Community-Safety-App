import json
import os
import time

import boto3
from fastapi import APIRouter, Request
from pydantic import BaseModel, Field, ConfigDict

from backend.utils.auto_response import generate_auto_response
from backend.store import REPORTS
from backend.logging_utils import logger

router = APIRouter()

REPORT_POSTPROCESS_QUEUE_URL = os.getenv("REPORT_POSTPROCESS_QUEUE_URL")
sqs = boto3.client("sqs", region_name=os.getenv("AWS_REGION", "us-east-1"))


def build_report_created_message(*, report_id: int, request_id: str, actor_user_id: int) -> dict:
    return {
        "event_type": "REPORT_CREATED",
        "report_id": report_id,
        "request_id": request_id,
        "actor_user_id": actor_user_id,
        "occurred_at": int(time.time()),
        "schema_version": 1,
    }


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
):
    request_id = getattr(request.state, "request_id", "unknown")

   
    logger.info(
        "report_submitted",
        extra={
            "request_id": request_id,
            "user_id": report.user_id,
            "role": "dev",
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

    sqs_message = build_report_created_message(
        report_id=report_id,
        request_id=request_id,
        actor_user_id=report.user_id,
    )

    if not REPORT_POSTPROCESS_QUEUE_URL:
        logger.warning(
            "report_postprocess_queue_url_missing",
            extra={"request_id": request_id, "report_id": report_id},
        )
    else:
        logger.info(
            "sending_to_sqs",
            extra={
                "queue_url": REPORT_POSTPROCESS_QUEUE_URL,
                "report_id": report_id,
                "request_id": request_id,
            },
        )

        try:
            sqs.send_message(
                QueueUrl=REPORT_POSTPROCESS_QUEUE_URL,
                MessageBody=json.dumps(sqs_message),
            )
            logger.info(
                "report_postprocess_sent_to_sqs",
                extra={"request_id": request_id, "report_id": report_id},
            )
        except Exception:
            logger.exception(
                "sqs_send_failed",
                extra={"request_id": request_id, "report_id": report_id},
            )

    response = generate_auto_response(report.message)

    return {
        "status": "received",
        "report_id": report_id,
        "auto_response": response or "Thanks for your report. Stay safe and connected!",
        "stored": True,
        "report_count": len(REPORTS),
        "request_id": request_id,
        "postprocess_event": sqs_message,
    }

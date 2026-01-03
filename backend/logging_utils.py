import logging
import uuid
from fastapi import Request

logger = logging.getLogger("community_safety")
logger.setLevel(logging.INFO)

if not logger.handlers:
    handler = logging.StreamHandler()
    formatter = logging.Formatter(
        "%(asctime)s %(levelname)s %(name)s %(message)s request_id=%(request_id)s user_id=%(user_id)s endpoint=%(endpoint)s"
    )
    handler.setFormatter(formatter)
    logger.addHandler(handler)

def get_request_id(request: Request) -> str:
    return request.headers.get("x-request-id") or str(uuid.uuid4())

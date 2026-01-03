from __future__ import annotations

import time
from collections import Counter
from fastapi import APIRouter, Depends

from backend.auth import require_role
from backend.store import REPORTS

router = APIRouter(prefix="/metrics", tags=["metrics"])

ADMIN_ONLY = require_role("admin")


@router.get("/summary")
def metrics_summary(user=Depends(ADMIN_ONLY)):
    now = int(time.time())
    last_24h = now - 24 * 60 * 60
    last_7d = now - 7 * 24 * 60 * 60
    last_30d = now - 30 * 24 * 60 * 60

    total = len(REPORTS)

    return {
        "total_reports": total,
        "reports_last_24h": sum(1 for r in REPORTS if r["created_at"] >= last_24h),
        "reports_last_7d": sum(1 for r in REPORTS if r["created_at"] >= last_7d),
        "reports_last_30d": sum(1 for r in REPORTS if r["created_at"] >= last_30d),
    }


@router.get("/by-category")
def metrics_by_category(user=Depends(ADMIN_ONLY)):
    counts = Counter(r.get("category", "uncategorized") for r in REPORTS)
    return {"by_category": dict(counts)}


@router.get("/by-severity")
def metrics_by_severity(user=Depends(ADMIN_ONLY)):
    counts = Counter(int(r.get("severity", 1)) for r in REPORTS)
    return {"by_severity": dict(counts)}


@router.get("/top-locations")
def metrics_top_locations(limit: int = 5, user=Depends(ADMIN_ONLY)):
    counts = Counter(r.get("location", "unknown") for r in REPORTS)
    return {"top_locations": counts.most_common(limit)}

from datetime import datetime, timezone

def assign_priority(description: str) -> str:
    high_priority_terms = ["weapon", "assault", "urgent"]
    text = description.lower()

    for term in high_priority_terms:
        if term in text:
            return "high"

    return "normal"


def generate_metadata():
    return {
        "created_at": datetime.now(timezone.utc).isoformat(),
        "status": "submitted"
    }
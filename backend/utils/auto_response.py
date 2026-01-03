from __future__ import annotations

def generate_auto_response(message: str) -> str:
    """
    Simple placeholder auto-response generator.
    You can replace this logic later with rules/LLM/etc.
    """
    msg = (message or "").lower()

    if any(word in msg for word in ["fire", "gun", "weapon", "shots", "shooting"]):
        return "If you believe there is an immediate danger, call 911. Stay in a safe location."
    if any(word in msg for word in ["theft", "stolen", "robbed", "burglary"]):
        return "Thanks for reporting. If this is an active situation, call 911. Otherwise, consider filing a police report."
    if any(word in msg for word in ["suspicious", "loitering", "unknown"]):
        return "Thanks for reporting. If you feel unsafe, move to a safe place and contact local authorities."

    return "Thanks for your report. Stay safe and connected!"

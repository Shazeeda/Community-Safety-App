KEYWORD_RESPONSES = {
    "break-in": "We’re sorry to hear about the break-in. You can report it here: [link]",
    "fire": "If you’re safe, call 911 immediately. Here’s a fire safety resource: [link]",
    "vandalism": "We recommend documenting the damage and reporting it here: [link]",
    "theft": "You can file a police report online at: [link]",
}

def generate_auto_response(report_text: str) -> str | None:
    text = report_text.lower()
    for keyword, response in KEYWORD_RESPONSES.items():
        if keyword in text:
            return response
    return None

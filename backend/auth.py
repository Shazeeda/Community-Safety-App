from fastapi import Header, HTTPException

def verify_token(authorization: str = Header(...)):
    try:
        token = authorization.split(" ")[1]
    except IndexError:
        raise HTTPException(status_code=401, detail="Invalid or missing token")

    if token != "securetoken123":
        raise HTTPException(status_code=401, detail="Unauthorized")

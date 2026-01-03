from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

from backend.auth import authenticate_user, create_access_token

router = APIRouter(prefix="/auth", tags=["auth"])


class LoginRequest(BaseModel):
    username: str = Field(..., min_length=3, max_length=50)
    password: str = Field(..., min_length=3, max_length=100)


@router.post("/login")
def login(body: LoginRequest):
    user = authenticate_user(body.username, body.password)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token(user_id=user["user_id"], role=user["role"])
    return {
        "access_token": token,
        "token_type": "Bearer",
        "role": user["role"],
        "user_id": user["user_id"],
    }

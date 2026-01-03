import os
import time
from typing import Callable, Dict, Optional

import jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer


MOCK_USERS: Dict[str, Dict] = {
    "user_demo": {"user_id": 101, "password": "password123", "role": "user"},
    "admin_demo": {"user_id": 1, "password": "admin123", "role": "admin"},
}

JWT_SECRET = os.getenv("JWT_SECRET", "dev_secret_change_me")
JWT_ALG = "HS256"
JWT_EXPIRES_SECONDS = 60 * 60  

bearer_scheme = HTTPBearer(auto_error=False)


def create_access_token(*, user_id: int, role: str) -> str:
    now = int(time.time())
    payload = {
        "sub": str(user_id),
        "role": role,
        "iat": now,
        "exp": now + JWT_EXPIRES_SECONDS,
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALG)


def authenticate_user(username: str, password: str) -> Optional[Dict]:
    user = MOCK_USERS.get(username)
    if not user:
        return None
    if user["password"] != password:
        return None
    return {"user_id": user["user_id"], "role": user["role"], "username": username}


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme),
) -> Dict:
    if credentials is None or credentials.scheme.lower() != "bearer":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing Bearer token",
        )

    token = credentials.credentials
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALG])
        user_id = int(payload.get("sub"))
        role = payload.get("role")
        if role not in {"user", "admin"}:
            raise ValueError("Invalid role")
        return {"user_id": user_id, "role": role}
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
        )


def require_role(required_role: str) -> Callable:
    def _role_guard(user: Dict = Depends(get_current_user)) -> Dict:
        if user["role"] != required_role:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Forbidden: insufficient role",
            )
        return user

    return _role_guard

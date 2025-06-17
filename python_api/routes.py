from fastapi import APIRouter, Depends, HTTPException
from auth import verify_token
from pydantic import BaseModel
from typing import List

router = APIRouter()

class Incident(BaseModel):
    title: str
    description: str


fake_db = []

@router.post("/incident", dependencies=[Depends(verify_token)])
def create_incident(incident: Incident):
    fake_db.append(incident)
    return {"message": "Incident created", "data": incident}

@router.get("/incidents", response_model=List[Incident])
def list_incidents():
    return fake_db

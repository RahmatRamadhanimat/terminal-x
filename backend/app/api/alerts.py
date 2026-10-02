from fastapi import APIRouter, HTTPException
from typing import List
from app.schemas.schemas import Alert, AlertCreate, AlertUpdate
from app.services.alert_service import alert_service

router = APIRouter()

@router.get("/alerts", response_model=List[Alert])
async def get_alerts():
    return alert_service.get_all()

@router.post("/alerts", response_model=Alert)
async def create_alert(alert: AlertCreate):
    return alert_service.create(alert)

@router.put("/alerts/{alert_id}", response_model=Alert)
async def update_alert(alert_id: str, alert: AlertUpdate):
    res = alert_service.update(alert_id, alert)
    if not res:
        raise HTTPException(status_code=404, detail="Alert not found")
    return res

@router.delete("/alerts/{alert_id}")
async def delete_alert(alert_id: str):
    res = alert_service.delete(alert_id)
    if not res:
        raise HTTPException(status_code=404, detail="Alert not found")
    return {"status": "ok"}

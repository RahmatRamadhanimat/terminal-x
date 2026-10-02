from app.schemas.schemas import Alert, AlertCreate, AlertUpdate
import uuid

class AlertService:
    def __init__(self):
        self.alerts = {}

    def get_all(self):
        return list(self.alerts.values())

    def create(self, alert_in: AlertCreate):
        alert = Alert(id=str(uuid.uuid4()), active=True, **alert_in.dict())
        self.alerts[alert.id] = alert
        return alert

    def update(self, alert_id: str, alert_in: AlertUpdate):
        if alert_id in self.alerts:
            self.alerts[alert_id].active = alert_in.active
            return self.alerts[alert_id]
        return None

    def delete(self, alert_id: str):
        if alert_id in self.alerts:
            del self.alerts[alert_id]
            return True
        return False

alert_service = AlertService()

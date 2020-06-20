
from sqlalchemy.orm import Session

from . import models, schemas

def get_boats(db: Session):
    return db.query(models.Boat).all()
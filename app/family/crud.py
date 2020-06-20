
from sqlalchemy.orm import Session

from . import models, schemas

def get_all_families(db: Session):
    return db.query(models.Family).all()
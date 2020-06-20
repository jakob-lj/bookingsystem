
from typing import List

from fastapi import Depends, APIRouter, HTTPException, status
from app.database import get_db
from app import crud
from sqlalchemy.orm import Session
from app.schemas import FamilyIn, Family, User
from app.routers import user

router = APIRouter()

@router.get("/", response_model=List[Family])
def get_all_families(db: Session = Depends(get_db)):
    return crud.get_all_families(db)

@router.post('/')
def create_family(family: FamilyIn, user: User = Depends(user.get_current_user), db: Session = Depends(get_db)):
    fam: Family = crud.create_family(db, family)
    membership = crud.add_member_to_family(db, fam, user, admin=True)
    return fam
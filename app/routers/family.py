
from typing import List

from fastapi import Depends, APIRouter, HTTPException, status
from app.database import get_db
from app import crud
from sqlalchemy.orm import Session
from app.schemas import FamilyIn, Family, User, BoatIn, Boat
from app.routers import user

router = APIRouter()

@router.get("/", response_model=List[Family])
def get_all_families(db: Session = Depends(get_db), current_user: User = Depends(user.get_current_user)):
    return crud.get_all_families_for_user(db, current_user)

@router.post('/')
def create_family(family: FamilyIn, user: User = Depends(user.get_current_user), db: Session = Depends(get_db)):
    fam: Family = crud.create_family(db, family)
    membership = crud.add_member_to_family(db, fam, user, admin=True)
    return {'ok': True}

@router.post('/{family_id}/boats', response_model=Boat)
def create_boat_in_family(family_id: int, boat: BoatIn, user: User = Depends(user.get_current_user), db: Session = Depends(get_db)):
    
    crud.check_if_user_in_family_and_admin(db, user, family_id) # will rais 401 if not authorized
    return crud.create_new_boat_in_family(db, boat, family_id)


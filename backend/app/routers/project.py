
from typing import List

from fastapi import Depends, APIRouter, HTTPException, status
from app.database import get_db
from app import crud
from sqlalchemy.orm import Session
from app.schemas import FamilyIn, Family, User, BoatIn, Boat, Project, ProjectIn
from app.routers import user

router = APIRouter()

@router.get("/", response_model=List[Project])
def get_all_projets(db: Session = Depends(get_db), current_user = Depends(user.get_current_user)):
    # return crud.get_all_projects(db, current_user)
    result = []
    addedIds = []
    userIsAdmin = crud.get_all_projects_where_user_is_admin(db, current_user)
    userInFamily = crud.get_all_projects_where_user_is_family_member(db, current_user)
    for l in userIsAdmin:
        if (l.project_id not in addedIds):
            result.append(l)
            addedIds.append(l.project_id)
    for l in userInFamily:
        if (l.project_id not in addedIds):
            result.append(l)
            addedIds.append(l.project_id)
    return result


@router.post('/')
def create_new_project(project: ProjectIn, db: Session = Depends(get_db), current_user = Depends(user.get_current_user)):
    new_project = crud.create_new_project(db, current_user, project)
    adminAdd = crud.add_administrator_to_project(db, current_user, new_project)
    return {'ok':True}

@router.get('/{project_id}/', response_model=Project)
def get_project_by_id(project_id: int, db: Session = Depends(get_db), current_user = Depends(user.get_current_user)):
    return crud.get_project_by_id(db, current_user, project_id)

@router.post('/{project_id}/boats/', response_model=Boat)
def create_new_boat_in_project(project_id: int, boat: BoatIn, db: Session=Depends(get_db), current_user = Depends(user.get_current_user)):
    crud.check_that_user_is_admin(db, project_id, current_user)
    return crud.create_new_boat_in_project(db, boat, project_id, current_user)
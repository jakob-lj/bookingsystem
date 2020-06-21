from sqlalchemy.orm import Session
from fastapi import HTTPException, status

from . import models, schemas

notAuthrizedException = HTTPException(
    status_code=status.HTTP_403_FORBIDDEN,
    detail="You are not authorized to perform action",
)

def get_password_hash(password, pwd_context):
    return pwd_context.hash(password)

def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.user_id == user_id).first()


def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()

def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()


def create_user(db: Session, user: schemas.UserCreate, pwd_context):
    db_user = models.User(email=user.email, username=user.username, hashed_password=get_password_hash(user.password, pwd_context))
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def get_items(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Item).offset(skip).limit(limit).all()


def create_user_item(db: Session, item: schemas.ItemCreate, user_id: int):
    db_item = models.Item(**item.dict(), owner_id=user_id)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

def get_all_families(db: Session):
    return db.query(models.Family).all()

def get_all_families_for_user(db: Session, user: schemas.User):
    return db.query(models.Family).filter(models.Family.family_id == models.FamilyMember.family_id, models.FamilyMember.user_id == user.user_id).all()

def get_all_projects(db: Session, user: schemas.User):
    return db.query(models.Project).all()

def get_all_projects_where_user_is_admin(db: Session, user: schemas.User):
    return db.query(models.Project).filter(models.Project.project_id == models.ProjectAdmin.project_id, models.ProjectAdmin.user_id == user.user_id).all()

def get_all_projects_where_user_is_family_member(db: Session, user: schemas.User):
    return db.query(models.Project).filter(models.Project.project_id == models.FamilyInProject.project_id, models.FamilyInProject.family_id == models.Family.family_id, models.Family.family_id == models.FamilyMember.family_id, models.FamilyMember.user_id == user.user_id).all()

def create_family(db: Session, family: schemas.FamilyIn):
    db_item = models.Family(**family.dict())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

def add_member_to_family(db: Session, family: schemas.Family, user: schemas.User, admin=False):
    db_item = models.FamilyMember(family=family, member=user, family_admin=admin)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

def check_if_user_in_family_and_admin(db: Session, user: schemas.User, family_id: int):
    familyAdmin = db.query(models.FamilyMember).filter(models.FamilyMember.family_id == family_id, models.FamilyMember.user_id == user.user_id, models.FamilyMember.family_admin == True).all()
    if (len(familyAdmin) != 1):
        raise notAuthrizedException

def create_new_boat_in_family(db: Session, boat: schemas.BoatIn, family_id: int):
    db_item = models.Boat(name = boat.name, family_id = family_id)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item


def create_new_project(db: Session, currentUser: schemas.User, project: schemas.ProjectIn):
    db_item = models.Project(**project.dict())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item
def add_administrator_to_project(db: Session, user: schemas.User, project: schemas.Project):
    db_item = models.ProjectAdmin(project_id = project.project_id, user_id = user.user_id)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item
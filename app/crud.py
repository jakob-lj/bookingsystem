from sqlalchemy.orm import Session

from . import models, schemas

def get_password_hash(password, pwd_context):
    return pwd_context.hash(password)

def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()


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

def create_family(db: Session, family: schemas.FamilyIn):
    db_item = models.Family(**family.dict())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

def add_administrator_to_family(db: Session, family: schemas.Family, user: schemas.User):
    db_item = models.FamilyMember(family=family, user=user)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item
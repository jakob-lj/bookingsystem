from typing import List

from pydantic import BaseModel

class ItemBase(BaseModel):
    title: str
    description: str = None


class ItemCreate(ItemBase):
    pass


class Item(ItemBase):
    item_id: int
    owner_id: int

    class Config:
        orm_mode = True


class UserBase(BaseModel):
    email: str
    username: str


class UserCreate(UserBase):
    password: str


class User(UserBase):
    user_id: int
    is_active: bool
    items: List[Item] = []

    class Config:
        orm_mode = True

class UserInFamily(UserBase):
    user_id: int

    class Config:
        orm_mode = True


class FamilyBase(BaseModel):
    name: str

    class Config:
        orm_mode = True


class FamilyMember(BaseModel):
    family_admin: bool
    family_id: int
    user_id: int
    member: User

    class Config:
        orm_mode = True

class FamilyMemberOut(BaseModel):
    family_admin: bool
    member: User

    class Config:
        orm_mode = True

class Family(FamilyBase):
    family_id: int
    members: List[FamilyMemberOut] = []
    #members: List[User]

    class Config: 
        orm_mode = True

class FamilyIn(FamilyBase):
    pass

class Boat(BaseModel):
    boat_id: int
    name: str
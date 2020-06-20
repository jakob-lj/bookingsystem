from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from app.database import Base

class User(Base):
    __tablename__ = "users"

    user_id= Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    username = Column(String)
    is_active = Column(Boolean, default=True)

    items = relationship("Item", back_populates="owner")
    family = relationship("FamilyMember", back_populates="member")

class Item(Base):
    __tablename__ = "items"

    item_id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String, index=True)
    owner_id = Column(Integer, ForeignKey("users.user_id"))

    owner = relationship("User", back_populates="items")

class FamilyMember(Base):
    __tablename__ = "familyhasmember"

    family_admin = Column(Boolean, default=False)

    family_id = Column(Integer, ForeignKey("family.family_id"), primary_key=True)
    user_id = Column(Integer, ForeignKey("users.user_id"), primary_key=True)
    family = relationship("Family", back_populates="members")
    member = relationship("User", back_populates="family")

class Family(Base):
    __tablename__ = "family"
    
    family_id = Column(Integer, primary_key=True, index=True)
    name = Column(String, default="Surname")
    members = relationship("FamilyMember", back_populates="family")
    boats = relationship("Boat", back_populates="family")

class Boat(Base):
    __tablename__ = "boats"

    boat_id = Column(Integer, primary_key=True, index=True)
    name = Column(String, default="")
    family_id = Column(Integer, ForeignKey("family.family_id"))
    family = relationship("Family", back_populates="boats")
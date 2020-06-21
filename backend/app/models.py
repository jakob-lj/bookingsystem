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
    admin_projects = relationship("ProjectAdmin", back_populates="user")

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

class FamilyInProject(Base):
    __tablename__ = "projecthasfamily"

    family_id = Column(Integer, ForeignKey("family.family_id"), primary_key=True)
    project_id = Column(Integer, ForeignKey("projects.project_id"), primary_key = True)
    family = relationship("Family", back_populates="projects")
    project = relationship("Project", back_populates="families")

class Family(Base):
    __tablename__ = "family"
    
    family_id = Column(Integer, primary_key=True, index=True)
    name = Column(String, default="Surname")
    members = relationship("FamilyMember", back_populates="family")
    projects = relationship("FamilyInProject", back_populates="family")

class Boat(Base):
    __tablename__ = "boats"

    boat_id = Column(Integer, primary_key=True, index=True)
    name = Column(String, default="")
    project_id = Column(Integer, ForeignKey("projects.project_id"))
    project = relationship("Project", back_populates="boats")

class Project(Base):
    __tablename__ = "projects"

    name = Column(String)
    project_id = Column(Integer, primary_key = True, index = True)
    families = relationship("FamilyInProject", back_populates="project")
    boats = relationship("Boat", back_populates="project")
    admins = relationship("ProjectAdmin", back_populates="project")
    

class ProjectAdmin(Base):
    __tablename__ = "projecthasadmin"

    project_id = Column(Integer, ForeignKey("projects.project_id"), primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.user_id"), primary_key=True, index=True)
    project = relationship("Project", back_populates="admins")
    user = relationship("User", back_populates="admin_projects")
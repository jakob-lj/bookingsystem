
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from app.database import Base

# class FamilyMember(Base):
#     __tablename__ = "familyhasmember"

#     faimlyId = Column(Integer, ForeignKey("families.id"), primary_key=True)
#     userId = Column(Integer, ForeignKey("users.id"), primary_key=True)
#     family = relationship("Family", back_populates="members")
#     member = relationship("User", back_populates="families")

class Family(Base):
    __tablename__ = "families"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, max_length=255, default="Surname")
    #members = relationship("FamilyMember", back_populates="family")

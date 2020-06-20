
from typing import List

from pydantic import BaseModel
from users.schemas import User


class Family(BaseModel):
    id: int
    name: str
    members: List[User] = []
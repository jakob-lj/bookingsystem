
from typing import List

from pydantic import BaseModel

class Boat(BaseModel):
    id: int
    name: str
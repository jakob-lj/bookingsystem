from fastapi import Depends, FastAPI
from fastapi.security import OAuth2PasswordBearer


app = FastAPI()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/token")


@app.get("/")
def read_root():
    return {"Hello": "There, smart ass, you the real thing"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: str = None):
    return {"item_id": item_id, "q": q}

@app.get("/authed/")
async def read_items(token: str = Depends(oauth2_scheme)):
    return {"token": token}
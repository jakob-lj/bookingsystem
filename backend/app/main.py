from datetime import datetime, timedelta

import time

import jwt
from fastapi import Depends, FastAPI, HTTPException, status, Request
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jwt import PyJWTError
from passlib.context import CryptContext
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from .routers import user, family, project



app = FastAPI()


origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    response.headers["X-Process-Time"] = str(process_time)
    return response

app.include_router(user.router, prefix='/users')
#app.include_router(boats.router, prefix='/boats', tags=['boats'], dependencies=[Depends(users.get_current_user)])
app.include_router(family.router, prefix='/family', tags=['families'], dependencies=[Depends(user.get_current_user)])
app.include_router(project.router, prefix='/project', tags=['projects'])

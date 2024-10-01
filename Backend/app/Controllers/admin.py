from fastapi import APIRouter,HTTPException,Depends
from fastapi.security import OAuth2AuthorizationCodeBearer
from passlib.context import CryptContext
from jose import JWTError,jwt
from datetime import datetime,timedelta
from typing import Optional    
from ..models import User,LoginForm
from ..database import get_admin  
from bson import ObjectId


router=APIRouter()

SECERETE_KEY='admin1234'
ALGORITHM='HS256'
ACCESS_TOKEN_EXPIRE_MINUTES=30

pwd_context=CryptContext(schemes=['bcrypt'],deprecated="auto")
oauth2_scheme = OAuth2AuthorizationCodeBearer(
    authorizationUrl="http://127.0.0.1:8000/admin", 
    tokenUrl="/token"
)

def hash_password(password:str)-> str:
    return pwd_context.hash(password)

def verify_password (plain_password:str,hashed_password:str)-> bool:
    return pwd_context.verify(plain_password,hashed_password)

def create_access_token(data:dict,expires_delta:Optional[timedelta]=None)-> str:
    to_encode=data.copy()
    if expires_delta:
        expire=datetime.utcnow()+expires_delta
    else:
        expire = datetime.utcnow()+timedelta(minutes=15)
    to_encode.update({"exp":expire})
    encode_jwt=jwt.encode(to_encode,SECERETE_KEY,algorithm=ALGORITHM)
    return encode_jwt 

admin_collection=get_admin()

@router.get("/Home")
def homeText():
    return {"message":"Home Page Route"}


@router.post("/admin_register",response_model=User)
async def admi_register(user:User):
  
    if admin_collection.find_one({"email":user.email}):
        raise HTTPException(status_code=400,detail="Email Already Registerd")
    user.password=hash_password(user.password)
    user_dict=user.dict()
    user_dict["_id"]=ObjectId()
    admin_collection.insert_one(user_dict)
    return user

@router.post("/admin_login")
async def admin_login(form_data:LoginForm):
    admin=admin_collection.find_one({'email':form_data.email})
    if not admin or not verify_password(form_data.password,admin['password']):
        raise HTTPException(status_code=400,detail="Invalid Email or Password")
    access_token_expires=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token=create_access_token(data={'sub':admin["email"]},expires_delta=access_token_expires)
    
    return {"access_token":access_token,"token_type":"bareer"}
    
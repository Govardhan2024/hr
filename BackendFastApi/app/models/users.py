from pydantic import BaseModel,EmailStr,constr

class User(BaseModel):
    id:str=None
    userName:str
    email:EmailStr
    password:constr(min_length=8)
    role: str  

class Login(BaseModel):
    email: EmailStr
    password: str
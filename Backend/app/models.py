from pydantic import BaseModel,EmailStr,Field
from bson import ObjectId

class User(BaseModel):
    id:str=Field(default_factory=str,alias='_id')
    email:EmailStr
    password:str
    
    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True

class LoginForm(BaseModel):
    email:str
    password:str
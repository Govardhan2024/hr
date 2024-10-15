from pydantic import BaseModel,EmailStr,constr
from datetime import datetime
from typing import Optional
from bson import ObjectId  


class User(BaseModel):
    id:str=None
    userName:str
    email:EmailStr
    password:constr(min_length=8)
    role: str  

class Login(BaseModel):
    email: EmailStr
    password: str
        
class Employee(BaseModel):
    employeeName: str
    employeePersonalEmail: EmailStr
    employeeWorkingEmail: EmailStr  # This will be used in the User model for login
    employeePhoneNumber: constr(min_length=10, max_length=15)  # Validate phone number length
    joinDate: datetime
    jobrole: str
    role:str
    pictureUpload: Optional[str] = None  # Path to the uploaded picture file
    createdOn: datetime = datetime.now()
    password: constr(min_length=8)  # This will be used in the User model for login
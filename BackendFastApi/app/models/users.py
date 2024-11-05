from pydantic import BaseModel,EmailStr,constr,Field
from datetime import datetime
from typing import Optional
from bson import ObjectId  
 
 
class User(BaseModel):
    id:str=None
    userName:str
    email:EmailStr
    password:constr(min_length=8)
    role: str  
class UserResponse(BaseModel):
    id: Optional[str] = None
    userName: str
    email: EmailStr
    role: str


class Login(BaseModel):
    email: EmailStr
    password: str
       
class Employee(BaseModel):
    id: Optional[str] = None  # Mark as Optional for database-generated IDs
    employeeName: str
    employeePersonalEmail: EmailStr
    employeeWorkingEmail: EmailStr  
    employeePhoneNumber: constr(min_length=10, max_length=15)
    joinDate: datetime
    jobrole: str
    role: str
    pictureUpload: Optional[str] = None  
    createdOn: datetime = Field(default_factory=datetime.now)  # Use default_factory for dynamic default
    password: constr(min_length=8)

class Holidays(BaseModel):
    id: Optional[str] = None
    leave_type: constr(min_length=3)  
    start_date: datetime                
    end_date: datetime                  
    reason: str                         
    status: str = Field(default="Approved")  
    created_on: datetime = Field(default_factory=datetime.now)

class LeaveRequest(BaseModel):
    leave_type: constr(min_length=3)
    start_date: datetime
    end_date: datetime
    reason: str
    status: str = Field(default="Pending")  # Default to 'Pending'
    created_on: datetime = Field(default_factory=datetime.utcnow)  # Updated to use utcnow()

class LeaveRequestResponse(BaseModel):
    id: str
    employee_id: str
    employee_name: str
    leave_type: str
    start_date: datetime
    end_date: datetime
    reason: str
    status: str
    created_on: datetime = Field(default_factory=datetime.utcnow)  # Updated to use utcnow()
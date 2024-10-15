from fastapi import FastAPI, APIRouter, HTTPException, Depends
from app.models.users import User, Login, Employee
from app.database import users_collection, employees_collection
from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordBearer
from datetime import timedelta, datetime
from bson import ObjectId
from app.configuration.emailconfigaration import send_welcome_email
import jwt

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")
SECRET_KEY = "your_secret_key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

router = APIRouter()    
pwd_context = CryptContext(schemes=['bcrypt'], deprecated="auto")

# Helper function to convert ObjectId to string
def convert_object_id(data):
    if isinstance(data, dict):
        return {k: (str(v) if isinstance(v, ObjectId) else convert_object_id(v)) for k, v in data.items()}
    elif isinstance(data, list):
        return [convert_object_id(item) for item in data]
    else:
        return data

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def authenticate_jwt(token: str):
    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials",
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_email = payload.get("sub")
        user_role = payload.get("role")
        if user_email is None or user_role is None:
            raise credentials_exception
        return user_email, user_role
    except jwt.PyJWTError:
        raise credentials_exception

@router.post('/register', response_model=User)
async def register(user: User):
    existing_user = await users_collection.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already exists")

    hashed_password = pwd_context.hash(user.password)
    new_user = user.dict()
    new_user["password"] = hashed_password

    result = await users_collection.insert_one(new_user)
    new_user["id"] = str(result.inserted_id)  # Convert ObjectId to string

    return new_user

@router.post('/login')
async def login(user: Login):
    if not user.email or not user.password:
        raise HTTPException(status_code=422, detail="Email and password are required.")
    
    db_user = await users_collection.find_one({"email": user.email})
    if not db_user:
        raise HTTPException(status_code=400, detail="Incorrect email or password")

    if not pwd_context.verify(user.password, db_user['password']):
        raise HTTPException(status_code=400, detail="Incorrect email or password")

    access_token = create_access_token(
        data={"sub": db_user['email'], "role": db_user['role']}
    )

    return {"access_token": access_token, "token_type": "bearer", "role": db_user['role']}

@router.post('/create-employee')
async def create_employee(employee: Employee):
    existing_user = await users_collection.find_one({"email": employee.employeeWorkingEmail})
    if existing_user:
        raise HTTPException(status_code=400, detail="Employee with this working email already exists")

    hashed_password = pwd_context.hash(employee.password)

    employee_data = employee.dict()
    employee_data["password"] = hashed_password
    employee_data["createdOn"] = datetime.now()

    employee_result = await employees_collection.insert_one(employee_data)

    employee_data["id"] = str(employee_result.inserted_id)  # Convert ObjectId to string

    user_data = {
        "userName": employee.employeeName,
        "email": employee.employeeWorkingEmail,
        "password": hashed_password,
        "role": employee.role
    }

    await users_collection.insert_one(user_data)

    # Convert any ObjectId in the employee data to string before returning
    employee_data = convert_object_id(employee_data)
    await send_welcome_email(employee.employeeWorkingEmail, employee.employeeName, employee.password)

    return {"message": "Employee created and registered successfully", "employee": employee_data}


@router.get('/  ', response_model=list[Employee])
async def get_all_employees():
    employees = await employees_collection.find().to_list(100)  
   
    for employee in employees:
        employee['id'] = str(employee['_id'])  
    
    return [Employee(**employee) for employee in employees]  
    


@router.get('/get-current-user', dependencies=[Depends(oauth2_scheme)])
async def get_current_user(token: str = Depends(oauth2_scheme)):
    user_email, user_role = await authenticate_jwt(token)
    user = await users_collection.find_one({"email": user_email})
    if user is None:
        raise HTTPException(status_code=401, detail="User not found")

    user['id'] = str(user['_id'])  
    del user['_id']  

    return {"role": user['role'], "id": user['id']}

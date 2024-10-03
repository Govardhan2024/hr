from fastapi import FastAPI, APIRouter, HTTPException, Depends
from app.models.users import User, Login 
from app.database import users_collection  
from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordBearer
from datetime import timedelta, datetime
import jwt

# JWT configuration
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")
SECRET_KEY = "your_secret_key"  # Change this to a strong secret key in production
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30  

router = APIRouter()
pwd_context = CryptContext(schemes=['bcrypt'], deprecated="auto")

# JWT utility function
def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# Dependency to authenticate JWT tokens
async def authenticate_jwt(token: str):
    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials",
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_email = payload.get("sub")  # This should return the user's email
        user_role = payload.get("role")    # This retrieves the role from the payload
        if user_email is None or user_role is None:
            raise credentials_exception
        return user_email, user_role  # Return both email and role as a tuple
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

    new_user["id"] = str(result.inserted_id)

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

# Example of a protected route for Admin
@router.get('/get-current-user', dependencies=[Depends(oauth2_scheme)])
async def get_current_user(token: str = Depends(oauth2_scheme)):
    user_email, user_role = await authenticate_jwt(token)  # Unpack the returned tuple
    user = await users_collection.find_one({"email": user_email})  # Fetch user by email
    if user is None:
        raise HTTPException(status_code=401, detail="User not found")
    return {"role": user['role']}  # Return the user's role
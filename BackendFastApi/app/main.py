from fastapi import FastAPI

from app.controllers.user_controller import router as user_router
from app.controllers.holidays import router as holiday_router
from fastapi.middleware.cors import CORSMiddleware


app=FastAPI()
origins = [
    "http://localhost:5173",  # Your React app's origin
    # Add more origins if needed    
]

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows requests from the specified origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)   
@app.get("/")
async def Home():
    return {"message": "Welcome to the FastAPI User Registration API!"}

app.include_router(user_router)
app.include_router(holiday_router)

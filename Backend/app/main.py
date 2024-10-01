from fastapi import FastAPI
from .Controllers.admin import router as admin_route
from fastapi.middleware.cors import CORSMiddleware


app =FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Frontend origin
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all HTTP headers
)
app.include_router(admin_route,prefix="/admin",tags=["admin"])

@app.get("/")
def home():
    return {"message":"Hello World"}



if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)

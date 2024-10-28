from fastapi import FastAPI, HTTPException,APIRouter
from app.models.users import Holidays
from datetime import datetime
from app.database import holidays_collection

router = APIRouter()



@router.post("/add_holidays", response_model=Holidays)
async def add_holiday(holiday: Holidays):
    holiday_dict = holiday.dict(exclude={"id", "created_on"})
    holiday_dict['created_on'] = datetime.now()

    # Insert the holiday into the database
    result = await holidays_collection.insert_one(holiday_dict)
    holiday_dict['id'] = str(result.inserted_id)
    return holiday_dict

@router.get("/all_holidays", response_model=list[Holidays])
async def get_holidays():
    holidays = []
    async for holiday in holidays_collection.find():
        holiday['_id'] = str(holiday['_id']) 
        holidays.append(Holidays(**holiday))
    return holidays
from fastapi import FastAPI, HTTPException,APIRouter,Query
from app.models.users import Holidays,LeaveRequest,LeaveRequestResponse
from datetime import datetime
from app.database import holidays_collection,leaves_collection,employees_collection,users_collection
from bson import ObjectId
from typing import List, Optional


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


@router.post("/leave-request/{employee_id}")
async def create_leave_request(employee_id: str, leave_request: LeaveRequest):
    # Check if the employee exists
    employee = await users_collection.find_one({"_id": ObjectId(employee_id)})
    
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")

    # Prepare the leave request data
    leave_request_data = leave_request.dict()
    leave_request_data['employee_id'] = employee_id  
    leave_request_data['created_on'] = datetime.utcnow()  # Use utcnow for consistent timestamps

    result = await leaves_collection.insert_one(leave_request_data)

    if result.inserted_id:
        return {"message": "Leave request created successfully", "id": str(result.inserted_id)}
    else:
        raise HTTPException(status_code=500, detail="Failed to create leave request")
    




@router.patch("/leave-request/reject/{id}")
async def approve_leave_request(id: str):
    try:
        leave_request_id_obj = ObjectId(id)  # Convert the ID parameter to ObjectId
    except bson_errors.InvalidId:
        raise HTTPException(status_code=400, detail="Invalid leave request ID format")

    # Update the leave request status to approved
    result = await leaves_collection.update_one(
        {"_id": leave_request_id_obj},  # Match by _id
        {"$set": {"status": "reject"}}
    )

    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Leave request not found")
    
    if result.modified_count == 0:
        raise HTTPException(status_code=400, detail="Leave request already approved")

    # Retrieve the updated leave request
    updated_leave_request = await leaves_collection.find_one({"_id": leave_request_id_obj})

    return LeaveRequestResponse(
        id=str(updated_leave_request["_id"]),  
        employee_id=updated_leave_request["employee_id"],
        employee_name=updated_leave_request.get("employee_name"),
        leave_type=updated_leave_request.get("leave_type"),
        start_date=updated_leave_request.get("start_date"),
        end_date=updated_leave_request.get("end_date"),
        reason=updated_leave_request.get("reason"),
        status=updated_leave_request["status"],  
        created_on=updated_leave_request["created_on"]
    )







@router.patch("/leave-request/approve/{id}")
async def approve_leave_request(id: str):
    try:
        leave_request_id_obj = ObjectId(id)  # Convert the ID parameter to ObjectId
    except bson_errors.InvalidId:
        raise HTTPException(status_code=400, detail="Invalid leave request ID format")

    # Update the leave request status to approved
    result = await leaves_collection.update_one(
        {"_id": leave_request_id_obj},  # Match by _id
        {"$set": {"status": "approved"}}
    )

    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Leave request not found")
    
    if result.modified_count == 0:
        raise HTTPException(status_code=400, detail="Leave request already approved")

    # Retrieve the updated leave request
    updated_leave_request = await leaves_collection.find_one({"_id": leave_request_id_obj})

    return LeaveRequestResponse(
        id=str(updated_leave_request["_id"]),  
        employee_id=updated_leave_request["employee_id"],
        employee_name=updated_leave_request.get("employee_name"),
        leave_type=updated_leave_request.get("leave_type"),
        start_date=updated_leave_request.get("start_date"),
        end_date=updated_leave_request.get("end_date"),
        reason=updated_leave_request.get("reason"),
        status=updated_leave_request["status"],  
        created_on=updated_leave_request["created_on"]
    )



@router.get("/leave-requests/{employee_id}", response_model=List[LeaveRequestResponse])
async def get_leave_requests_by_employee_id(employee_id: str):
    # Query leave requests based on employee_id
    query = {"employee_id": employee_id}

    leaves = await leaves_collection.find(query).to_list(length=100)

    if not leaves:
        raise HTTPException(status_code=404, detail="No leave requests found for this employee")

    leave_responses = []
    for leave in leaves:
        # Fetch employee details using employee_id
        emp = await users_collection.find_one({"_id": ObjectId(leave["employee_id"])})

        employee_name = emp["userName"] if emp else "Unknown"

        leave_responses.append({
            "id": str(leave["_id"]),
            "employee_id": leave["employee_id"],
            "employee_name": employee_name,
            "leave_type": leave.get("leave_type"),
            "start_date": leave.get("start_date"),
            "end_date": leave.get("end_date"),
            "reason": leave.get("reason"),
            "status": leave.get("status"),
            "created_on": leave.get("created_on"),
        })

    return leave_responses



@router.get("/leave-requests", response_model=List[LeaveRequestResponse])
async def get_all_leave_requests(userName: Optional[str] = Query(None)):
    query = {}

    if userName:
        
        employee = await users_collection.find_one({"userName": userName})

        if not employee:
            raise HTTPException(status_code=404, detail="Employee not found")

        employee_id = str(employee["_id"])
        query["employee_id"] = employee_id  

   
    leaves = await leaves_collection.find(query).to_list(length=100)

    if not leaves:
        raise HTTPException(status_code=404, detail="No leave requests found")

    leave_responses = []
    for leave in leaves:
   
        emp = await users_collection.find_one({"_id": ObjectId(leave["employee_id"])})

        employee_name = emp["userName"] if emp else "Unknown"

        leave_responses.append({
            "id": str(leave["_id"]),
            "employee_id": leave["employee_id"],
            "employee_name": employee_name, 
            "leave_type": leave.get("leave_type"), 
            "start_date": leave.get("start_date"),
            "end_date": leave.get("end_date"),
            "reason": leave.get("reason"),
            "status": leave.get("status"),
            "created_on": leave.get("created_on"),
        })

    return leave_responses
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig
from fastapi import HTTPException
from pydantic import BaseModel
import os

# Email configuration
conf = ConnectionConfig(
    MAIL_USERNAME=os.getenv("MAIL_USERNAME", "saikrishnanaiudub@gmail.com"), 
    MAIL_PASSWORD=os.getenv("MAIL_PASSWORD", "rvvo vkfi hepj ytfl"),   
    MAIL_FROM=os.getenv("MAIL_FROM", "saikrishnanaiudub@gmail.com"),          
    MAIL_PORT=587,                                                  
    MAIL_SERVER="smtp.gmail.com",                                     
    MAIL_FROM_NAME="Viyona Fintech",                                
    MAIL_STARTTLS=True,                                             
    MAIL_SSL_TLS=False,                                              
                                 
)

class Employee(BaseModel):
    employeeName: str
    employeePersonalEmail: str
    employeeWorkingEmail: str
    employeePhoneNumber: str
    joinDate: str
    jobrole: str
    role: str
    password: str

async def send_welcome_email(employee_email: str, employee_name: str, password: str):
    """
    Send a welcome email to the newly added employee.

    Args:
        employee_email (str): The email address of the employee.
        employee_name (str): The name of the employee.
        password (str): The password for the employee's account.

    Raises:
        HTTPException: If there is an error while sending the email.
    """
    message = MessageSchema(
        subject="Welcome to the Company",
        recipients=[employee_email],
        body=(
            f"Hello {employee_name},\n\n"
            f"Welcome to the company! Here are your login details:\n\n"
            f"Email: {employee_email}\n"
            f"Password: {password}\n\n"
            "Best regards,\n"
            "Viona Fintech"
        ),
        subtype="plain"
    )
    
    fm = FastMail(conf)
    try:
        await fm.send_message(message)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to send email: {str(e)}")

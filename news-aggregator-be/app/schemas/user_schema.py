# Importing BaseModel for creating schemas (data validation models)
# EmailStr is used to validate email format
from pydantic import BaseModel, EmailStr

# Schema for user registration (signup)
class UserCreate(BaseModel):

    # User's name (required string)
    name: str

    # User's email (must be valid email format)
    email: EmailStr

    # User's password (required string)
    password: str

# Schema for user login
class UserLogin(BaseModel):

    # User's email (validated)
    email: EmailStr

    # User's password
    password: str
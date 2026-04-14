# Importing FastAPI utilities
from fastapi import Depends, HTTPException

# Importing JWT functions
from jose import jwt, JWTError

# Importing database session type
from sqlalchemy.orm import Session

# Importing DB session factory
from app.db.session import SessionLocal

# Importing app settings (SECRET_KEY, ALGORITHM)
from app.core.config import settings

# Importing DAO function to fetch user
from app.dao.user_dao import get_user_by_email

# Importing OAuth2PasswordBearer for token-based authentication
from fastapi.security import OAuth2PasswordBearer

# Creating OAuth2 scheme
# tokenUrl should point to your login endpoint
# This enables Swagger "Authorize" button
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

# ---------------- DATABASE DEPENDENCY ---------------- #

# Provides a database session to routes
def get_db():
    db = SessionLocal()  # Create new DB session
    try:
        yield db         # Provide session
    finally:
        db.close()       # Close after request


# ---------------- AUTH DEPENDENCY ---------------- #

# Function to get current authenticated user
def get_current_user(
    # Automatically extracts token from Authorization header
    token: str = Depends(oauth2_scheme),

    # Injects database session
    db: Session = Depends(get_db)
):
    try:
        # Decode JWT token using secret key and algorithm
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])

        # Extract user email from token payload ("sub" field)
        email: str = payload.get("sub")

        # If email is missing, token is invalid
        if email is None:
            raise HTTPException(status_code=401, detail="Invalid token")

    except JWTError:
        # Handles invalid, expired, or tampered tokens
        raise HTTPException(status_code=401, detail="Invalid token")

    # Fetch user from database using email
    user = get_user_by_email(db, email)

    # If user does not exist
    if not user:
        raise HTTPException(status_code=401, detail="User not found")

    # Return authenticated user
    return user

# Function to enforce role-based access control
def require_role(role: str):

    # Inner function that will be used as a dependency
    def role_checker(
        # Gets current authenticated user using JWT
        user = Depends(get_current_user)
    ):
        # Check if user's role matches required role
        if user.role != role:

            # If not authorized, raise 403 Forbidden error
            raise HTTPException(status_code=403, detail="Access denied")

        # If authorized, return user
        return user

    # Return the dependency function
    return role_checker
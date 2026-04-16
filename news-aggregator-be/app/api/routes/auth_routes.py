# Importing FastAPI utilities
from fastapi import APIRouter, Depends, HTTPException

# Importing database session type
from sqlalchemy.orm import Session

# Importing request schemas
from app.schemas.user_schema import UserCreate, UserLogin

# Importing response schema
from app.schemas.auth_schema import TokenResponse

# Importing service layer functions
from app.services.auth_service import register_user, login_user

# Importing database session factory
from app.db.session import SessionLocal

from jose import jwt, JWTError
from app.core.config import settings
from app.core.security import create_access_token

# Creating API router
router = APIRouter()


# ---------------- DATABASE DEPENDENCY ---------------- #

# Dependency function to provide DB session
def get_db():
    db = SessionLocal()  # Create new DB session
    try:
        yield db         # Provide session to route
    finally:
        db.close()       # Close session after request


# ---------------- REGISTER ROUTE ---------------- #

# Endpoint to register a new user
@router.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):

    try:
        # Call service to register user
        return register_user(db, user)

    except Exception as e:
        # Return HTTP 400 if error occurs
        raise HTTPException(status_code=400, detail=str(e))


# ---------------- LOGIN ROUTE ---------------- #

# Endpoint to login user
@router.post("/login", response_model=TokenResponse)
def login(user: UserLogin, db: Session = Depends(get_db)):

    try:
        # Call service to login user
        return login_user(db, user)

    except Exception as e:
        # Return HTTP 401 for authentication errors
        raise HTTPException(status_code=401, detail=str(e))
    
@router.post("/refresh")
def refresh_access_token(refresh_token: str):
    try:
        # Decode refresh token
        payload = jwt.decode(
            refresh_token,
            settings.SECRET_KEY,
            algorithms=[settings.ALGORITHM]
        )

        email = payload.get("sub")
        token_type = payload.get("type")

        # Ensure it's a refresh token
        if email is None or token_type != "refresh":
            raise HTTPException(status_code=401, detail="Invalid refresh token")

    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid or expired refresh token")

    # Generate new access token
    new_access_token = create_access_token({"sub": email})

    return {
        "access_token": new_access_token
    }
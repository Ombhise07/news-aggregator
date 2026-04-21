## IMP IN THIS FILE SOME CHNAGES NEED TO BE MADE DURING PRODUCTION

# Importing FastAPI utilities
from fastapi import APIRouter, Depends, HTTPException

# Importing database session type
from sqlalchemy.orm import Session

# Importing request schemas
from app.schemas.user_schema import UserCreate, UserLogin

# Importing response schema
from app.schemas.auth_schema import TokenResponse

# Importing service layer functions
from app.services.auth_service import register_user, login_user, refresh_access_token
from app.dao.token_dao import revoke_token

# Importing database session factory
from app.db.session import SessionLocal

from fastapi import Response, Request

from app.core.config import settings

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
@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db), response: Response = None):
    """
    Authenticates a user and issues JWT tokens.

    Flow:
    1. Validate user credentials
    2. Generate access + refresh tokens
    3. Store refresh token securely in HttpOnly cookie
    4. Return access token in response body
    """

    try:
        # # Authenticate user and generate tokens
        # - access_token: short-lived (used for API requests)
        # - refresh_token: long-lived (used to get new access tokens)
        access_token, refresh_token = login_user(db, user)

        # Store refresh token in HttpOnly cookie
        # This prevents JavaScript access (protects against XSS attacks)
        response.set_cookie(
            key="refresh_token",
            value=refresh_token,
            httponly=True,   # Prevents client-side JS from reading the cookie
            secure=False,    # -> Set to True in production (requires HTTPS) <-
            samesite="lax"   # Helps mitigate CSRF attacks
        )

        # Return only access token in response body
        # (refresh token stays hidden in cookie for better security)
        return {
            "access_token": access_token,
            "token_type": "bearer"
        }
    
    except Exception as e:
        # If authentication fails, return 401 Unauthorized
        raise HTTPException(status_code=401, detail=str(e))

# route for rotation of access token using referesh token
@router.post("/refresh")
def refresh_access(request: Request, db: Session = Depends(get_db), response: Response = None):
    try:
        # Get refresh token from cookie
        refresh_token = request.cookies.get("refresh_token")

        if not refresh_token:
            raise Exception("No refresh token")
        
        # Call service layer (DB + rotation logic)
        new_access, new_refresh = refresh_access_token(db, refresh_token)

        # Rotate refresh token cookie
        response.set_cookie(
            key="refresh_token",
            value=new_refresh,
            httponly=True,
            secure=False,   # -> True in production <-
            samesite="lax"
        )

        return {
            "access_token": new_access
        }
    except Exception as e:
        raise HTTPException(status_code=401, detail=str(e))
    

# route for logout
@router.post("/logout")
def logout(request: Request, db: Session = Depends(get_db), response: Response = None):

    # Get refresh token from HttpOnly cookie
    refresh_token = request.cookies.get("refresh_token")

    # If token exists, revoke it in DB (invalidate it)
    if refresh_token:
        revoke_token(db, refresh_token)

    # Remove refresh token cookie from browser
    response.delete_cookie("refresh_token")

    # Send confirmation response
    return {"message": "Logged out"}
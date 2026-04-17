# Importing Session for database interaction
from sqlalchemy.orm import Session

# Importing DAO functions for user operations
from app.dao.user_dao import get_user_by_email, create_user

# Importing DAO function for create refresh tokens
from app.dao.token_dao import create_refresh_token_record, get_token, revoke_token

# importing datetime
from datetime import datetime

# Importing security functions (hashing and JWT)
from app.core.security import hash_password, verify_password, create_access_token, create_refresh_token

from jose import jwt

from app.core.config import settings


# Function to register a new user
def register_user(db: Session, user_data):

    # Check if user already exists
    existing_user = get_user_by_email(db, user_data.email)

    if existing_user:
        raise Exception("User already exists")

    # Convert Pydantic schema to dictionary
    user_dict = user_data.dict()

    # Hash the password before storing
    user_dict["password"] = hash_password(user_dict["password"])

    # Create user in database
    user = create_user(db, user_dict)

    return user


# Function to login user
def login_user(db, user_data):

    # Fetch user by email
    user = get_user_by_email(db, user_data.email)

    if not user:
        raise Exception("User not found")

    # Combined validation (cleaner)
    if not user or not verify_password(user_data.password, user.password):
        raise Exception("Invalid credentials")

    # Create access and refresh tokens
    access_token = create_access_token({"sub": user.email})
    refresh_token, expires_at = create_refresh_token({"sub": user.email})

    # Store refresh token in database
    create_refresh_token_record(db, user.id, refresh_token, expires_at)

    # Return tokens
    return access_token, refresh_token

def refresh_access_token(db, refresh_token: str):
    """
    Refreshes the access token using a valid refresh token.

    Flow:
    1. Validate refresh token from DB
    2. Check if token is revoked or expired
    3. Decode token to extract user identity
    4. Revoke old refresh token (rotation)
    5. Issue new access + refresh tokens
    6. Store new refresh token in DB
    """

    # Fetch refresh token record from database
    token_record = get_token(db, refresh_token)

    # If token does not exist → invalid request
    if not token_record:
        raise Exception("Invalid refresh token")

    # If token is already revoked → possible reuse attack
    if token_record.is_revoked:
        raise Exception("Token revoked")

    # Check if refresh token is expired
    if token_record.expires_at < datetime.utcnow():
        raise Exception("Token expired")

    # Decode JWT refresh token to extract payload (user identity)
    payload = jwt.decode(
        refresh_token,
        settings.SECRET_KEY,
        algorithms=[settings.ALGORITHM]
    )
    email = payload.get("sub")  # 'sub' contains user email

    # Fetch user from database using email
    user = get_user_by_email(db, email)

    # TOKEN ROTATION:
    # Revoke the old refresh token to prevent reuse
    revoke_token(db, refresh_token)

    # Generate new access token (short-lived)
    new_access = create_access_token({"sub": user.email})

    # Generate new refresh token (long-lived)
    new_refresh, expires_at = create_refresh_token({"sub": user.email})

    # Store new refresh token in DB
    create_refresh_token_record(db, user.id, new_refresh, expires_at)

    # Return new tokens to client
    return new_access, new_refresh
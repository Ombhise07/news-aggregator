# Importing Session for database interaction
from sqlalchemy.orm import Session

# Importing DAO functions for user operations
from app.dao.user_dao import get_user_by_email, create_user

# Importing DAO function for saving refresh tokens
from app.dao.token_dao import save_refresh_token

# Importing security functions (hashing and JWT)
from app.core.security import hash_password, verify_password, create_access_token, create_refresh_token


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
def login_user(db: Session, user_data):

    # Fetch user by email
    user = get_user_by_email(db, user_data.email)

    if not user:
        raise Exception("User not found")

    # Verify password
    if not verify_password(user_data.password, user.password):
        raise Exception("Invalid credentials")

    # Create access and refresh tokens
    access_token = create_access_token({"sub": user.email})
    refresh_token = create_refresh_token({"sub": user.email})

    # Store refresh token in database
    save_refresh_token(db, user.id, refresh_token)

    # Return tokens
    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer"
    }
# Importing CryptContext for password hashing
from passlib.context import CryptContext

# Importing JWT functions from python-jose
from jose import jwt

# Importing datetime utilities for token expiry
from datetime import datetime, timedelta

# Importing settings (SECRET_KEY, ALGORITHM, expiry times)
from app.core.config import settings


# Creating password hashing context using bcrypt algorithm
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


# ---------------- PASSWORD FUNCTIONS ---------------- #

# Function to hash plain password before storing in DB
def hash_password(password: str):
    return pwd_context.hash(password)


# Function to verify plain password with hashed password
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


# ---------------- ACCESS TOKEN ---------------- #

# Function to create access token (short-lived)
def create_access_token(data: dict):

    # Copy data to avoid modifying original dictionary
    to_encode = data.copy()

    # Set expiration time (in minutes)
    expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)

    # Add expiration to token payload
    to_encode.update({
        "exp": expire,
        "type": "access"
    })

    # Encode and return JWT token
    return jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)


# ---------------- REFRESH TOKEN ---------------- #

# Function to create refresh token (long-lived)
def create_refresh_token(data: dict):

    # Copy data
    to_encode = data.copy()

    # Set expiration time (in days)
    expire = datetime.utcnow() + timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS)

    # Add expiration to payload
    to_encode.update({
        "exp": expire,
    })

    # Encode token
    encoded = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)

    # Encode and return JWT token
    return encoded, expire
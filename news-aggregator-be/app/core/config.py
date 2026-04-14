# Importing os module to access environment variables
import os

# Importing load_dotenv to load variables from .env file
from dotenv import load_dotenv

# Loading environment variables from .env file into system environment
load_dotenv()


# Creating a Settings class to store all configuration values
class Settings:

    # Database connection URL (PostgreSQL / MySQL / SQLite etc.)
    DATABASE_URL = os.getenv("DATABASE_URL")

    # Secret key used for signing JWT tokens
    SECRET_KEY = os.getenv("SECRET_KEY")

    # Algorithm used for JWT (e.g., HS256)
    ALGORITHM = os.getenv("ALGORITHM")

    # Access token expiry time (in minutes)
    # Converted to integer since env variables are strings
    ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES"))

    # Refresh token expiry time (in days)
    REFRESH_TOKEN_EXPIRE_DAYS = int(os.getenv("REFRESH_TOKEN_EXPIRE_DAYS"))


# Creating a single instance of Settings to use across the app
settings = Settings()
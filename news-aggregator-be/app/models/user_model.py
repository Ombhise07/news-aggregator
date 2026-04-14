# Importing required SQLAlchemy column types
from sqlalchemy import Column, Integer, String, Boolean

# Importing Base class to inherit and create ORM model
from app.db.base import Base

# Defining User model (represents 'users' table in database)
class User(Base):

    # Name of the table in the database
    __tablename__ = "users"

    # Primary key ID for each user
    id = Column(Integer, primary_key=True, index=True)

    # User's name (optional field)
    name = Column(String, nullable=True)

    # User's email (must be unique and cannot be null)
    email = Column(String, unique=True, index=True, nullable=False)

    # User's password (nullable for OAuth users)
    password = Column(String, nullable=True)
    # Nullable because users logging in via Google/Microsoft won't have password

    # Indicates whether the user account is active
    is_active = Column(Boolean, default=True)

    # Provider used for authentication (local / google / microsoft)
    provider = Column(String, default="local")

    # Stores provider-specific user ID (for OAuth logins)
    provider_id = Column(String, nullable=True)

    # future: user / admin / moderator
    role = Column(String, default="user")
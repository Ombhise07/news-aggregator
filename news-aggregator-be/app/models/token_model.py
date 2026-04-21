# Importing required SQLAlchemy components
from sqlalchemy import Column, Integer, String, ForeignKey,Boolean, DateTime

# importing datetime
from datetime import datetime

# Importing Base class for ORM model creation
from app.db.base import Base

# Defining RefreshToken model (represents 'refresh_tokens' table)
class RefreshToken(Base):

    # Table name in the database
    __tablename__ = "refresh_tokens"

    # Primary key for each refresh token record
    id = Column(Integer, primary_key=True, index=True)

    # Foreign key linking token to a user
    # References 'id' column of 'users' table
    user_id = Column(Integer, ForeignKey("users.id"))

    # Stores the actual refresh token string
    # Cannot be null (every record must have a token)
    token = Column(String, nullable=False)

    # track if token is revoked
    is_revoked = Column(Boolean, default=False)

    # When token was created 
    created_at = Column(DateTime, default=datetime.utcnow)

    # token expiry time
    expires_at = Column(DateTime)
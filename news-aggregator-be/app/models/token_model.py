# Importing required SQLAlchemy components
from sqlalchemy import Column, Integer, String, ForeignKey

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

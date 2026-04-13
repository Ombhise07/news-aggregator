# Importing create_engine to establish connection with the database
from sqlalchemy import create_engine

# Importing sessionmaker to create database session factory
from sqlalchemy.orm import sessionmaker

# Creating the database engine
# This connects your application to the database using DATABASE_URL
engine = create_engine("DATABASE_URL")

# Creating a SessionLocal class (session factory)
# Each instance of SessionLocal will be a new database session
SessionLocal = sessionmaker(
    autocommit=False,  # Changes will not be committed automatically
    autoflush=False,   # Changes will not be sent to DB automatically before queries
    bind=engine        # Binds the session to the database engine
)
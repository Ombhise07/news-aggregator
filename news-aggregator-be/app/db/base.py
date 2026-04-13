# Importing declarative_base function from SQLAlchemy ORM
# This function is used to create a base class for all database models
from sqlalchemy.orm import declarative_base

# Creating a Base class using declarative_base()
# This Base will act as the parent class for all ORM models (tables)
# Any class that represents a database table will inherit from this Base
Base = declarative_base()
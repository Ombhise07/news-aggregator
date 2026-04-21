# Importing Session type for database interaction
from sqlalchemy.orm import Session

# Importing User model (represents users table)
from app.models.user_model import User


# Function to get a user by email
def get_user_by_email(db: Session, email: str):

    # Querying the User table
    # Filtering by email and returning first match
    return db.query(User).filter(User.email == email).first()


# Function to create a new user
def create_user(db: Session, user_data: dict):

    # Creating User object using dictionary unpacking
    user = User(**user_data)

    # Adding user to database session
    db.add(user)

    # Committing changes (saving to database)
    db.commit()

    # Refreshing instance to get updated values (like id)
    db.refresh(user)

    # Returning created user
    return user
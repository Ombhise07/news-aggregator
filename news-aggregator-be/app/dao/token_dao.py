# Importing Session for database interaction
from sqlalchemy.orm import Session

# Importing RefreshToken model (represents refresh_tokens table)
from app.models.token_model import RefreshToken


# Function to save refresh token in database
def save_refresh_token(db: Session, user_id: int, token: str):

    # Creating a new RefreshToken object
    db_token = RefreshToken(user_id=user_id, token=token)

    # Adding token to database session
    db.add(db_token)

    # Committing changes (saving to database)
    db.commit()

    # Returning the saved token object
    return db_token
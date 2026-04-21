# Importing Session for database interaction
from sqlalchemy.orm import Session

# Importing RefreshToken model (represents refresh_tokens table)
from app.models.token_model import RefreshToken


# Function to save refresh token in database
def create_refresh_token_record(db: Session, user_id: int, token: str, expires_at):

    # Creating a new RefreshToken object
    db_token = RefreshToken(
        user_id=user_id, 
        token=token,
        expires_at=expires_at   
    )

    # Adding token to database session
    db.add(db_token)

    # Committing changes (saving to database)
    db.commit()

    # refereshing to get updated values
    db.refresh(db_token)

    # Returning the saved token object
    return db_token

# get token from database
def get_token(db: Session, token: str):
    return db.query(RefreshToken).filter(RefreshToken.token == token).first()

# Revoke token (Logout/ Rotation)
def revoke_token(db: Session, token: str):
    db_token = get_token(db, token)

    if db_token:
        db_token.is_revoked = True
        db.commit() 
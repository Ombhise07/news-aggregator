from sqlalchemy.orm import Session
from app.models.favorite_model import Favorite


def create_favorite(db: Session, user_id: int, data):
    favorite = Favorite(user_id=user_id, **data)
    db.add(favorite)
    db.commit()
    db.refresh(favorite)
    return favorite


def get_user_favorites(db: Session, user_id: int):
    return db.query(Favorite).filter(Favorite.user_id == user_id).all()


def delete_favorite(db: Session, user_id: int, url: str):
    fav = db.query(Favorite).filter(
        Favorite.user_id == user_id,
        Favorite.url == url
    ).first()

    if fav:
        db.delete(fav)
        db.commit()
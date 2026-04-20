from fastapi import APIRouter, Depends
from app.api.deps import get_current_user, get_db
from sqlalchemy.orm import Session

from app.schemas.favorite_schema import FavoriteCreate
from app.services.favorite_service import add_favorite, list_favorites, remove_favorite

router = APIRouter()


@router.post("/")
def add(data: FavoriteCreate, user = Depends(get_current_user), db: Session = Depends(get_db)):
    return add_favorite(db, user, data)


@router.get("/")
def get_all(user = Depends(get_current_user), db: Session = Depends(get_db)):
    return list_favorites(db, user)


@router.delete("/")
def delete(url: str, user = Depends(get_current_user), db: Session = Depends(get_db)):
    remove_favorite(db, user, url)
    return {"message": "removed"}
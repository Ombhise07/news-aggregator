from app.dao.favorite_dao import create_favorite, get_user_favorites, delete_favorite

def add_favorite(db, user, data):
    return create_favorite(db, user.id, data.dict())


def list_favorites(db, user):
    return get_user_favorites(db, user.id)


def remove_favorite(db, user, url):
    delete_favorite(db, user.id, url)
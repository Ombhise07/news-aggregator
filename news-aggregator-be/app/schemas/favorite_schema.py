# Importing BaseModel for creating schemas (data validation models)
from pydantic import BaseModel


# Schema for creating a new favorite (input request)
class FavoriteCreate(BaseModel):

    # Article title
    title: str

    # Article description/summary
    description: str

    # Article URL (important identifier)
    url: str

    # Image URL (thumbnail)
    image: str

    # Source of the article (e.g., BBC, CNN)
    source: str

    # Published date of the article
    published_at: str


# Schema for returning favorite data (API response)
class FavoriteResponse(BaseModel):

    # Unique ID of the favorite
    id: int

    # Article title
    title: str

    # Article URL
    url: str

    # Configuration for compatibility with SQLAlchemy ORM
    class Config:

        # Allows returning ORM objects directly from database
        orm_mode = True


# Why this file is important:
# - Validates incoming request data
# - Defines clean API response structure
# - Separates input and output schemas (best practice)
#
# Example usage:
# @router.post("/favorites", response_model=FavoriteResponse)
# def add_favorite(fav: FavoriteCreate):
#     ...
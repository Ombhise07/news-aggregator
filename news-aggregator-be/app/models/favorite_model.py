# Importing required SQLAlchemy components
from sqlalchemy import Column, Integer, String, ForeignKey, UniqueConstraint

# Importing Base class for ORM model
from app.db.base import Base


# Defining Favorite model (represents 'favorites' table)
class Favorite(Base):

    # Table name in database
    __tablename__ = "favorites"

    # Ensures a user cannot save the same URL twice
    __table_args__ = (
        UniqueConstraint('user_id', 'url', name='unique_user_url'),
    )

    # Primary key for each favorite
    id = Column(Integer, primary_key=True, index=True)

    # Foreign key linking favorite to a user
    user_id = Column(Integer, ForeignKey("users.id"))

    # URL of the saved article (required field)
    url = Column(String, nullable=False)

    # Article title
    title = Column(String)

    # Article description/summary
    description = Column(String)

    # Article image URL (thumbnail)
    image = Column(String)

    # Source of the article (e.g., BBC, CNN)
    source = Column(String)

    # Published date of the article
    published_at = Column(String)

    # Table-level configuration for SQLAlchemy model
    __table_args__ = (
        # Ensures that each user can save a specific URL only once
        # Combination of (user_id + url) must be unique
        UniqueConstraint('user_id', 'url', name='unique_user_article'),
        )


# Why this model is important:
# - Allows users to save/bookmark articles
# - Links saved articles to users
# - Prevents duplicate favorites per user
#
# Example usage:
# favorite = Favorite(user_id=1, url="https://news.com/article")
# db.add(favorite)
# db.commit()
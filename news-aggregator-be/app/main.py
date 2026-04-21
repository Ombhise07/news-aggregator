# Importing FastAPI framework
from fastapi import FastAPI

# Importing authentication routes
from app.api.routes import auth_routes, user_routes 

# Importing the Base and engine for database setup
from app.db.base import Base
from app.db.session import engine
from app.api.routes import favorite_routes


# Creating FastAPI application instance
# Title will appear in API documentation (Swagger UI)
app = FastAPI(title="AI News Aggregator API")

# This creates all tables
Base.metadata.create_all(bind=engine)


# Including authentication routes in the app
# prefix="/auth" → all routes will start with /auth
# tags=["Auth"] → groups endpoints under "Auth" section in docs
app.include_router(auth_routes.router, prefix="/auth", tags=["Auth"])

# Including user-related routes
# prefix="/users" → all user endpoints start with /users
# tags=["Users"] → grouped under "Users" in Swagger UI
app.include_router(user_routes.router, prefix="/users", tags=["Users"])

# for favorites route
app.include_router(favorite_routes.router, prefix="/favorites", tags=["Favorites"])
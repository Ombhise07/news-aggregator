# Importing FastAPI utilities
from fastapi import APIRouter, Depends

# Importing dependency to get authenticated user
from app.api.deps import get_current_user


# Creating router for user-related endpoints
router = APIRouter()


# Endpoint to get current logged-in user details
@router.get("/me")
def get_me(

    # Injects authenticated user using JWT token
    user = Depends(get_current_user)
):

    # Returning user information
    return {
        "id": user.id,
        "email": user.email,
        "name": user.name,
        "role": user.role
    }
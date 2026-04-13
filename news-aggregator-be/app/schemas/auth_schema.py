# Importing BaseModel for creating response schema
from pydantic import BaseModel


# Schema for authentication response (login/signup)
class TokenResponse(BaseModel):

    # Short-lived token used to access protected APIs
    access_token: str

    # Long-lived token used to generate new access tokens
    refresh_token: str

    # Type of token (default is "bearer")
    # Used in Authorization header: "Bearer <token>"
    token_type: str = "bearer"
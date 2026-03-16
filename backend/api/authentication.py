import jwt
import time
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed

from django.contrib.auth.models import AnonymousUser

class ExternalJWTAuthentication(BaseAuthentication):
    def authenticate(self, request):
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith("Bearer "):
            return None

        token = auth_header.split("Bearer ")[1]

        try:
            payload = jwt.decode(token, options={"verify_signature": False})
            exp = payload.get('exp')
            if exp is not None and exp < time.time():
                raise AuthenticationFailed("Token expiré")

            request.user_payload = payload
            return (AnonymousUser(), token)  

        except jwt.DecodeError:
            raise AuthenticationFailed("Token invalide")

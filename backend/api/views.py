
from django.db import  DatabaseError
from django.forms.models import model_to_dict
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .models import *
from .serializers import *
from .utils import *
from .permissions import HasRolePermission
from dashboard_config_test import *
from rest_framework import status


def error_response(error_type, message, details=None, status_code=status.HTTP_400_BAD_REQUEST):
    """Format unifié pour toutes les erreurs API."""
    payload = {"error": {"type": error_type, "message": message}}
    if details:
        payload["error"]["details"] = str(details)
    return Response(payload, status=status_code)

class LoginProxyView(APIView):
    authentication_classes = []
    permission_classes = []

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        application_name = request.data.get('application')

        if not username or not password or not application_name:
            return error_response(
                "ValidationError",
                "Champs requis : username, password, application"
            )

        try:
            resp = requests.post(
                f"{EADMIN_BACK_API_URL}/login/",
                json={'username': username, 'password': password, 'application': application_name},
                timeout=10
            )
            return Response(resp.json(), status=resp.status_code)
        except requests.exceptions.SSLError as ssl_err:
            return error_response("SSLConnectionError", "Erreur SSL avec le backend père", ssl_err, status.HTTP_503_SERVICE_UNAVAILABLE)
        except requests.exceptions.ConnectionError as conn_err:
            return error_response("ConnectionError", "Impossible de se connecter au backend père", conn_err, status.HTTP_503_SERVICE_UNAVAILABLE)
        except requests.exceptions.Timeout:
            return error_response("TimeoutError", "Le backend père ne répond pas", status_code=status.HTTP_504_GATEWAY_TIMEOUT)
        except Exception as e:
            return error_response("UnexpectedError", "Erreur inattendue lors du login", e, status.HTTP_500_INTERNAL_SERVER_ERROR)


class LogoutView(APIView):
    authentication_classes = []
    permission_classes = []

    def post(self, request):
        try:
            resp = requests.post(
                f"{EADMIN_BACK_API_URL}/logout/",
                json=request.data,
                headers={"Authorization": request.headers.get("Authorization")},
                timeout=10
            )
            return Response(resp.json() if resp.content else {}, status=resp.status_code)
        except requests.RequestException as e:
            return error_response("ConnectionError", "Impossible de joindre le backend père", e, status=status.HTTP_503_SERVICE_UNAVAILABLE)


class TokenRefreshView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            resp = requests.post(f"{EADMIN_BACK_API_URL}/refresh/", json=request.data, timeout=10)
            return Response(resp.json(), status=resp.status_code)
        except requests.RequestException as e:
            return error_response("ConnectionError", "Impossible de joindre le backend père", e, status=status.HTTP_503_SERVICE_UNAVAILABLE)

class LogListView(APIView):
    permission_classes = [HasRolePermission]
    allowed_roles = ['admin']

    def get(self, request):
        try:
            logs = Log.objects.all().order_by('-execution_date')
            logs_data = [model_to_dict(log) for log in logs]
            return Response(logs_data)
        except DatabaseError as e:
            return error_response("DatabaseError", "Impossible de récupérer les logs", e)
        except Exception as e:
            return error_response("UnexpectedError", "Erreur inconnue lors de la récupération des logs", e)

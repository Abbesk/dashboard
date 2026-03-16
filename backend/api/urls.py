from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()

urlpatterns = [
    path('login/', LoginProxyView.as_view(), name='login-proxy'),
    path('logs/', LogListView.as_view(), name='log-list'),
    path('refresh/', TokenRefreshView.as_view(), name='token-refresh'),
    path('logout/', LogoutView.as_view(), name='logout'),




    path('', include(router.urls)),
]

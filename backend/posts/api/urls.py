from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import PostViewSet , ReqViewSet

post_router = DefaultRouter()
req_router = DefaultRouter()
post_router.register(r'posts',PostViewSet)
req_router.register(r'posts',ReqViewSet)
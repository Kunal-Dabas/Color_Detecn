from rest_framework.routers import DefaultRouter
from posts.api.urls import post_router , req_router
from django.urls import path,include
 
router = DefaultRouter()
#posts
router.registry.extend( post_router.registry )
# router.registry.extend( req_router.registry )

router1 = DefaultRouter()
router1.registry.extend( req_router.registry)

urlpatterns = [
    path('' , include(router.urls)),
    path('fetch' , include( router1.urls) ),
]

#Other Requests 
from rest_framework.viewsets import ModelViewSet
from ..models import Post , Req
from .serializers import PostSerializer , ReqSerializer


class PostViewSet(ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

class ReqViewSet(ModelViewSet):
    queryset = Req.objects.all()
    serializer_class = ReqSerializer 
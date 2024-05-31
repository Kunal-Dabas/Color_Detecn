from rest_framework.serializers import ModelSerializer
from ..models import Post , Req

class PostSerializer(ModelSerializer):
    class Meta:
        model = Post
        fields = ('id' , 'title' , 'body' , 'venue_img')

class PostSerializer1(ModelSerializer):
    class Meta:
        model = Post
        fields = ('title' , 'body' , 'venue_img')

class ImgSerializer(ModelSerializer):
    class Meta:
        model = Post
        fields = ('id' , 'venue_img')

class ReqSerializer(ModelSerializer):
    class Meta:
        model = Req
        fields = ('id' , 'ans')
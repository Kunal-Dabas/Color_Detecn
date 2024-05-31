from django.shortcuts import render
from django.http import JsonResponse
from .models import Post , Req
from .api.serializers import ReqSerializer , PostSerializer , ImgSerializer , PostSerializer1
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from subprocess import PIPE , run
import sys
import json

def hex_to_rgb(hex_color):
    h = hex_color.lstrip('#')
    return(tuple(int(h[i:i+2], 16) for i in (0, 2, 4)))

@api_view( [ 'GET'])            
def Img_details(request):
    try:
        My_loan = Req.objects.all()
    except Req.DoesNotExist:
        return Response( status = status.HTTP_404_NOT_FOUND)
    
    if ( request.method == 'GET'):
        # print(Req)
        L_serialized  = ReqSerializer( My_loan , many = True )
        return JsonResponse( L_serialized.data , safe=False )
    
@api_view( [ 'GET'])            
def Img_dir(request):
    try:
        My_loan = Post.objects.all()
    except Post.DoesNotExist:
        return Response( status = status.HTTP_404_NOT_FOUND)
    
    if ( request.method == 'GET'):
        # print(Post)
        L_serialized  = ImgSerializer( My_loan , many = True )
        return Response( L_serialized.data )
    
@api_view( ['POST'])
def Post_details(request):
        App_serializer = PostSerializer1( data = request.data)
        # print(cleaned_output)
        
        if App_serializer.is_valid():
            App_serializer.save()
            venue_img = App_serializer.validated_data.get('venue_img')
            inp = 'X:\\VS_code\\Color_Detecn\\backend\\media\\images\\'+venue_img.name
            print("here")
            out = run( [sys.executable , 'X:\\VS_code\\Color_Detecn\\backend\\openCV-color-detection-master\\main.py',inp],shell = False , stdout= PIPE)
            output = out.stdout
            print("here1")
            decoded_output = output.decode('utf-8')
            cleaned_output = decoded_output.replace("b", "").replace("\n", "").replace("'","")
            rgb_string = cleaned_output.replace('(', '[').replace(')', ']')
            json_data = json.loads(rgb_string)
            print(type(json_data))
            abbreviations = ['URO', 'BIL', 'KET', 'BLD', 'PRO', 'NIT', 'LEU', 'GLU', 'SG', 'PH']
            rgb_dict = dict(zip(abbreviations, json_data))

            return Response( rgb_dict , status = status.HTTP_201_CREATED )
        else:
            return Response( App_serializer.data , status = status.HTTP_206_PARTIAL_CONTENT)
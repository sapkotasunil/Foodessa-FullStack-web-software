from django.shortcuts import render
from rest_framework import generics
from .models import User
from .serializers import UserRegisterSerializers
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import CustomTokenObtainPairSerializer



class UserRegisterView(generics.CreateAPIView):
    serializer_class=UserRegisterSerializers
    permission_classes=[AllowAny]


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
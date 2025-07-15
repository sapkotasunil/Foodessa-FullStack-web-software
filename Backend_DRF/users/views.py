from django.shortcuts import render
from rest_framework import generics
from .models import User
from .serializers import UserRegisterSerializers
from rest_framework.permissions import AllowAny


class UserRegisterView(generics.CreateAPIView):
    queryset=User.objects.all()
    serializer_class=UserRegisterSerializers
    permission_classes=[AllowAny]


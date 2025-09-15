from django.shortcuts import render
from rest_framework import generics
from .models import User
from .serializers import UserRegisterSerializers
from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import CustomTokenObtainPairSerializer,UserRoleSerializer



class UserRegisterView(generics.CreateAPIView):
    serializer_class=UserRegisterSerializers
    permission_classes=[AllowAny]


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
    

class userDetailsEdit(generics.RetrieveUpdateDestroyAPIView):
    serializer_class=UserRegisterSerializers
    queryset=User.objects.all()
    permission_classes=[IsAuthenticated]
    
    
class UserRole(generics.RetrieveAPIView):
    serializer_class=UserRoleSerializer
    queryset=User.objects.all()
    permission_classes=[IsAuthenticated]
    
    def get_object(self):
        return self.request.user
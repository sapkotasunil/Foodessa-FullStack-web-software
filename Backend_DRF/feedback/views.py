from django.shortcuts import render
from .serializer import feedBackSerializer
from rest_framework import generics,permissions
from .models import feedbackModel


class FeedbackForm(generics.ListCreateAPIView):
    serializer_class=feedBackSerializer
    queryset=feedbackModel.objects.all()
    permission_classes=[permissions.AllowAny]
    

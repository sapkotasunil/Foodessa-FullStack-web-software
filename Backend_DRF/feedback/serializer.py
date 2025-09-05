from rest_framework import serializers
from .models import feedbackModel


class feedBackSerializer(serializers.ModelSerializer):
  class Meta:
        model=feedbackModel
        fields="__all__"
        
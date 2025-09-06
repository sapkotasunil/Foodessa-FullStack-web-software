from django.db import models
from django.core.validators import MinValueValidator,MaxValueValidator

class feedbackModel(models.Model):
    name=models.CharField(max_length=100)
    email=models.CharField(max_length=100)
    subject=models.CharField(max_length=100)
    message=models.CharField(max_length=400)
    rating=models.IntegerField(validators=[
            MinValueValidator(0),
            MaxValueValidator(5)
            
        ],blank=True,null=True)
    phone=models.CharField(max_length=15,blank=True,null=True)
    created_at=models.DateTimeField(auto_now_add=True,blank=True,null=True)
    
    
    
    
   
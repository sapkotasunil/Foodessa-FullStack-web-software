from django.db import models

from django.contrib.auth import get_user_model


User=get_user_model() # This will get the custom User model defined in users/models.py
class SellerRegistrationForm(models.Model):
    class Kitchen_Types(models.TextChoices):
        HOME="home","Home",
        HOTEL= "hotel","Hotel"
    
    
    user=models.OneToOneField(User, on_delete=models.CASCADE, unique=True,related_name='seller_profile')
    kitchen_name = models.CharField(max_length=100)
    kitchen_description = models.TextField(blank=True, null=True)
    kitchen_address = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=10, blank=False, null=False)
    kitchen_Types= models.CharField(default=Kitchen_Types.HOTEL,blank=False ,null= False)
    kitchen_profile_photo=models.FileField(upload_to="kitchens/profile_picture")
    kitchen_qr_photo=models.FileField(upload_to="kitchens/QRimages", blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True) # Automatically set the date when the record is created


    def __str__(self):
        return self.kitchen_name

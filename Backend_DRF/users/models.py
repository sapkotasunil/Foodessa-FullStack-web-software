from django.db import models
from django.contrib.auth.models import AbstractUser



# Create your models here.
class User(AbstractUser):
    
    class RoleOptions(models.TextChoices):
        BUYER='buyer','Buyer'  #buyer(left side) used for store and Buyer (Right Side)used for display 
        SELLER='seller','Seller'
        MANAGER='manager','Manager'
        
    class GenderOptions(models.TextChoices):
        MALE = 'male', 'Male'
        FEMALE = 'female', 'Female'
        OTHER = 'other', 'Other'

    role = models.CharField(max_length=10,choices=RoleOptions.choices,default=RoleOptions.BUYER)
    phone_number = models.CharField(max_length=10, blank=False, null=False)
    address = models.CharField(max_length=255, blank=True, null=True)
    profile_picture = models.ImageField(upload_to='users/profile_pictures/', blank=True, null=True)
    gender = models.CharField(max_length=10, choices=GenderOptions.choices, default=GenderOptions.MALE)

    def __str__(self):
        return f"{self.username} ({self.role})"

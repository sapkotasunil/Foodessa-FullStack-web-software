from django.contrib import admin
from .models import SellerRegistrationForm

class Seller_registration_form_admin(admin.ModelAdmin):
    list_display=("user", "kitchen_name","phone_number")
    
admin.site.register(SellerRegistrationForm,Seller_registration_form_admin)
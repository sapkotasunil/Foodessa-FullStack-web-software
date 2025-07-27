from django.db import models
from seller_registration_data.models import SellerRegistrationForm 

class Item(models.Model):
    class CategoryOption(models.TextChoices):
        PIZZA = 'pizza', 'Pizza'
        CHICKEN = 'chicken', 'Chicken'
        DRINKS = 'drinks', 'Drinks'
        FRUITS = 'fruits', 'Fruits'
        MOMO = 'momo', 'Momo'
        ROTI='roti',"Roti"
        OTHERS = 'others', 'Others'
        KHANA_SET = 'khana_set', 'Khana Set'
        LUNCH = 'lunch', 'Lunch'
        DINNER = 'dinner', 'Dinner'

    class AvailabelFieldOption(models.TextChoices):
        YES='yes','Yes'
        NO='no','No'
    
    kitchen_name=models.ForeignKey(SellerRegistrationForm,on_delete=models.CASCADE,related_name="menu_items")
    item_name=models.CharField(max_length=40, blank=False, null=False)
    item_description=models.TextField(blank=True, null=True)
    price=models.DecimalField( max_digits=8,decimal_places=2,)
    category=models.CharField(default=CategoryOption.OTHERS, choices=CategoryOption.choices ,max_length=30 )
    image=models.ImageField(upload_to="seller/items")
    is_available=models.CharField(default=AvailabelFieldOption.NO , choices=AvailabelFieldOption.choices ,max_length=5)
    created_at = models.DateTimeField(auto_now_add=True) # Automatically set the date when the record is created
    available_quantity=models.DecimalField(max_digits=8,decimal_places=2, default=0)
    sold_quantity=models.DecimalField(max_digits=8,decimal_places=2, default=0)
    
    def __str__(self):
        return f"{self.item_name} : {self.kitchen_name.kitchen_name}"
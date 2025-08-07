from django.contrib import admin
from .models import Order

class OrdersAdmin(admin.ModelAdmin):
    list_display=("kitchen_name","buyer_name","items_name","orderStatus")
    
admin.site.register(Order,OrdersAdmin)

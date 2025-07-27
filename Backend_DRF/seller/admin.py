from django.contrib import admin
from .models import Item


# Register your models here.
class ItemDataAdmin(admin.ModelAdmin):
    list_display=("kitchen_name", "item_name","price","is_available")
    
admin.site.register(Item,ItemDataAdmin)
    
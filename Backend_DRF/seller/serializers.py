from rest_framework import serializers
from .models import Item

class ItemsSerializer(serializers.ModelSerializer):
    kitchen_name=serializers.SerializerMethodField()
    
    class Meta:
        model=Item
        fields="__all__"
        extra_kwargs={"kitchen_name":{"required":False}}
    
    
    
    def get_kitchen_name(self,obj):
        return obj.kitchen_name.kitchen_name
    
    
 
        
    
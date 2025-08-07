from rest_framework import serializers
from .models import Order

class orderSerializer(serializers.ModelSerializer):
    buyer_name=serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        fields='__all__'
        model=Order
        read_only_fields = ['kitchen_name', 'buyer_name', 'items_name']
        
        
    def get_buyer_name(self,obj):
        return obj.buyer_name.username if obj.buyer_name else None
        
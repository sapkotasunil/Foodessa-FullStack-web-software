from rest_framework import serializers
from .models import Order

class orderSerializer(serializers.ModelSerializer):
    buyer_name=serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        fields='__all__'
        model=Order
        extra_kwargs={"buyer_name":{"required":False}}
        
        
    def get_buyer_name(self,obj):
        return obj.buyer_name.username if obj.buyer_name else None
        
from rest_framework import serializers
from .models import Order

class orderSerializer(serializers.ModelSerializer):
    buyer_name=serializers.SerializerMethodField(read_only=True)
    kitchen_id=serializers.SerializerMethodField(read_only=True)
    kitchen_name=serializers.SerializerMethodField(read_only=True)
    item_image=serializers.SerializerMethodField(read_only=True)
    item_name=serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        fields = [
            "item_image",
            "kitchen_name",
            "buyer_name",
            "items_name",
            "orderStatus",
            "deleveryStatus",
            "paymentStatus",
            "quantity",
            "totalPrice",
            "deliveryAddress",
            "created_at",
            "Status_updated_at",
            "payment",
            "item_name",
            "phone_number",
            "kitchen_id"
        ]
        model=Order
        read_only_fields = ['kitchen_name', 'buyer_name', 'items_name','kitchen_id']
        
        
    def get_buyer_name(self,obj):
        return obj.buyer_name.username if obj.buyer_name else None
    
    def get_kitchen_name(self,obj):
        return obj.kitchen_name.kitchen_name if obj.kitchen_name else None
    
    def get_kitchen_id(self,obj):
        return obj.kitchen_name.id if obj.kitchen_name else None
    
    def get_item_name(self,obj):
        return obj.items_name.item_name if obj.items_name else None
    
    def get_item_image(self,obj):
        if obj.items_name and obj.items_name.image:
            request = self.context.get('request')
            return request.build_absolute_uri(obj.items_name.image.url) if request else obj.items_name.image.url
        return None
        
        # def get_item_image(self,obj): return obj.items_name.image if obj.items_name else None
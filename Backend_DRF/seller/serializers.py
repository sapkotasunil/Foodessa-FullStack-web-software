from rest_framework import serializers
from .models import Item

class ItemsSerializer(serializers.ModelSerializer):
    kitchen_name=serializers.SerializerMethodField()
    kitchen_photo=serializers.SerializerMethodField()
    newQuantity = serializers.IntegerField(write_only=True, required=False, default=0)
    
    class Meta:
        model=Item
        fields="__all__"
        extra_kwargs={"kitchen_name":{"required":False}}
        extra_kwargs={"kitchen_photo":{"required":False}}



    def get_kitchen_name(self,obj):
        return obj.kitchen_name.kitchen_name

    def get_kitchen_photo(self, obj):
        if obj.kitchen_photo:
            return self.context['request'].build_absolute_uri(obj.kitchen_photo.url)
        return None
    
    def create(self, validated_data):
        validated_data.pop("newQuantity", None)  # remove extra field
        return super().create(validated_data)
    
    


    
 
        
    
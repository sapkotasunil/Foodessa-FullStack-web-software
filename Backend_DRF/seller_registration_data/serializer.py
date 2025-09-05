from rest_framework import serializers
from .models import SellerRegistrationForm

class SellerRegistrationFormSerializers(serializers.ModelSerializer):
    class Meta:
        model=SellerRegistrationForm
        fields="__all__"
        extra_kwargs={"user":{"required":False}}
    
    
class kitchenDetailsViewserializer(serializers.ModelSerializer):
    kitchen_profile_photo = serializers.ImageField(required=False)
    kitchen_profile_photo_url = serializers.SerializerMethodField(read_only=True)
    user = serializers.SerializerMethodField()
    user_role = serializers.SerializerMethodField(read_only=True)
    user_id = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = SellerRegistrationForm
        fields = [
            "id",
            "kitchen_name",
            "kitchen_description",
            "kitchen_address",
            "phone_number",
            "kitchen_Types",
            "kitchen_profile_photo",   # accepts file upload
            "kitchen_profile_photo_url",  # returns full URL
            "created_at",
            "user",
            "user_role",
            "kitchen_qr_photo",
            "user_id"
        ]

    def get_kitchen_profile_photo_url(self, obj):
        request = self.context.get("request")
        if obj.kitchen_profile_photo:
            raw_url = obj.kitchen_profile_photo.url.replace("/media/", "/api/v1/media/")
            return request.build_absolute_uri(raw_url)
        return None

    def get_user(self, obj):
        return obj.user.username

    def get_user_role(self, obj):
        return obj.user.role
    
    def get_user_id(self, obj):
        return obj.user.id

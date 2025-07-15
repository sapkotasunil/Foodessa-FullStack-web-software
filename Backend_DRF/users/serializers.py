from rest_framework import serializers
from .models import User

class UserRegisterSerializers(serializers.ModelSerializer):
    password=serializers.CharField(write_only=True,min_length=6,style={"input_type":"password"})
    class Meta:
        model=User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'password', 'role', 'address', 'profile_picture']
        
    def create(self,validated_data):
        user=User.objects.create_user(
          username=validated_data["username"],
          first_name=validated_data.get("first_name", ''),
          last_name=validated_data.get("last_name", ''),
          email=validated_data['email'],
          password=validated_data["password"],
        )
        # Set additional optional fields
        user.role = validated_data.get('role', 'buyer')
        user.address = validated_data.get('address', '')
        user.profile_picture = validated_data.get('profile_picture', None)
        user.save()

        return user
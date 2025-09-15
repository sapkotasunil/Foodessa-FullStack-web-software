from rest_framework import serializers
from .models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class UserRegisterSerializers(serializers.ModelSerializer):
    password=serializers.CharField(write_only=True,min_length=6,style={"input_type":"password"})
    class Meta:
        model=User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'password', 'role', 'address', 'profile_picture',"phone_number"]
        
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
        user.phone_number=validated_data.get('phone_number','')
        user.save()

        return user
      
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    profile_picture=serializers.SerializerMethodField()
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims
        token['username'] = user.username
        token['email'] = user.email
        return token

    def validate(self, attrs):
        data = super().validate(attrs)

        # Add user info to the response
        data['user'] = {
            'id': self.user.id,
            'username': self.user.username,
            'email': self.user.email,
            'first_name': self.user.first_name,
            'last_name': self.user.last_name,
            'address': self.user.address,
            'phone_number': self.user.phone_number,
            'profile_picture': self.get_profile_picture(self.user),
            'role': self.user.role,
        }
        return data
    
        
    def get_profile_picture(self,obj):
        request=self.context.get('request')
        if obj.profile_picture:
            raw_url = obj.profile_picture.url.replace("/media/", "/api/v1/media/")
            return request.build_absolute_uri(raw_url)
        return None


class UserRoleSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=["role"]
    
from django.shortcuts import render
from rest_framework import permissions,generics
from rest_framework.exceptions import PermissionDenied
from .models import Item
from .serializers import ItemsSerializer
from seller_registration_data.models import SellerRegistrationForm


class ItemListCreateView(generics.ListCreateAPIView):
    queryset=Item.objects.all()
    serializer_class=ItemsSerializer
    permission_classes=[permissions.IsAuthenticated]
    
    
    def get_queryset(self):
        user=self.request.user
        print(user)
        if user.role!="seller":
            raise PermissionDenied("Only sellers can view their items.")
        try:
            seller=SellerRegistrationForm.objects.get(user=user)
        except:
            raise PermissionDenied("seller account not found.")
        
        return Item.objects.filter(kitchen_name=seller)
            
    
    
    def perform_create(self,serializer):
        user=self.request.user  #it return a user 
        if(user.role !="seller"):
            raise PermissionDenied("Only seller can add items.")
        
        try:
            seller=SellerRegistrationForm.objects.get(user=user) # it return a seller or kitchen_name
        except:
            raise PermissionDenied("seller profile not found")
        
        serializer.save(kitchen_name=seller) # seller name would be saved as a kitchen name in item models , so we dont need to send kitchen name from frontend
        serializer.save(kitchen_photo=seller.kitchen_profile_photo) # seller kitchen image would be saved as a kitchen image in item models , so we dont need to send kitchen name from frontend
        

class BuyerItemListView(generics.ListAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemsSerializer
    permission_classes = [permissions.AllowAny]  # Anyone can access it (no login required)
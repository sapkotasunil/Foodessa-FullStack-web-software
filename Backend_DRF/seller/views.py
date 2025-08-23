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
    
    
    def get_queryset(self): #controls what you can see (filtering results).
        user=self.request.user
        print(user)
        if user.role!="seller":
            raise PermissionDenied("Only sellers can view their items.")
        try:
            seller=SellerRegistrationForm.objects.get(user=user)
        except:
            raise PermissionDenied("seller account not found.")
        
        return Item.objects.filter(kitchen_name=seller)#Return item those creted by specific seller not all item
            
    
    
    def perform_create(self,serializer): #controls what happens when you save (adding extra data).
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
    
    
class ItemQuantityUpdate(generics.RetrieveUpdateDestroyAPIView):
    queryset=Item.objects.all()
    serializer_class=ItemsSerializer
    permission_classes=[permissions.IsAuthenticated]
    
    def perform_update(self, serializer):
        instance = self.get_object()  # current Item from DB
        new_quantity=serializer.validated_data.get("newQuantity",0)
        print(new_quantity)
        is_available=serializer.validated_data.get("is_available",instance.is_available)
        
        if(new_quantity <0 and abs(new_quantity)>instance.available_quantity):
            raise PermissionDenied(f"You are trying to remove more items({new_quantity}) from available quantity({instance.available_quantity})")
        updated_quantity = instance.available_quantity + new_quantity
            
        if instance.available_quantity<1 :
           updated_is_available = "no"
        if is_available=="yes" and instance.available_quantity<1:
            updated_is_available = "no"
            # raise PermissionDenied("No Quantity available for Sale! Please add Quantity to Continue.")
            
        else:
            updated_is_available = is_available
        
        
        serializer.save(
        available_quantity=updated_quantity,
        is_available=updated_is_available
    )
        
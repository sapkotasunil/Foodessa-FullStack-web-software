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
        new_quantity = serializer.validated_data.get("newQuantity", 0)
        is_available = serializer.validated_data.get("is_available", instance.is_available)

        # Prevent removing more items than available
        if new_quantity < 0 and abs(new_quantity) > instance.available_quantity:
            raise PermissionDenied(
                f"You are trying to remove more items ({abs(new_quantity)}) "
                f"than available ({instance.available_quantity})."
            )

        # Calculate new stock
        updated_quantity = instance.available_quantity + new_quantity
        
        if new_quantity<0:
            if abs(new_quantity)==instance.available_quantity:
                updated_is_available = "no"

        # Case 1: If stock becomes 0, always force is_available = "no"
        if updated_quantity < 1:
            updated_is_available = "no"
            
            
        # Case 2: If stock > 0, accept user choice
        else:
            updated_is_available = is_available

        # Save updated values
        serializer.save(
            available_quantity=updated_quantity,
            is_available=updated_is_available,
        )
        if updated_quantity < 1:
            if is_available == "yes" and new_quantity<0:
                raise PermissionDenied(
                  {
                      "Message":"Update Quantity sucessfully",
                      "Error":"No Quantity available for Sale! Please add Quantity to Continue."
                  }
                )
            elif is_available == "yes":
                raise PermissionDenied( "No Quantity available for Sale! Please add Quantity to Continue.")
            updated_is_available = "no"

            
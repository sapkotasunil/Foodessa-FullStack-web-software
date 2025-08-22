from .serializers import orderSerializer
from .models import Order
from rest_framework import generics,permissions
from rest_framework.exceptions import ValidationError,NotFound
from .models import Item
from seller_registration_data.models import SellerRegistrationForm
from rest_framework.exceptions import PermissionDenied



class CreateOrderView(generics.CreateAPIView):
    serializer_class=orderSerializer
    permission_classes=[permissions.IsAuthenticated]
    
    def perform_create(self, serializer):
        user=self.request.user
        item_id=self.request.data.get("item_name")

        if not item_id:
            raise ValidationError ("Item Name is required")
        
        try:
            item=Item.objects.get(id=item_id)
        except Item.DoesNotExist:
            raise NotFound("items not found")
        serializer.save(items_name=item,kitchen_name=item.kitchen_name,buyer_name=user)
        
class FetchOrderByBuyer(generics.ListAPIView):
    serializer_class=orderSerializer
    permission_classes=[permissions.IsAuthenticated]
    queryset=Order.objects.all()
    
    def get_queryset(self):
        user=self.request.user
        return Order.objects.filter(buyer_name=user)
    
class FetchOrderBySeller(generics.ListAPIView):
    serializer_class=orderSerializer
    permission_classes=[permissions.IsAuthenticated]
    queryset=Order.objects.all()
    
    def get_queryset(self):
        user=self.request.user
        if(user.role !="seller"):
            raise  PermissionDenied("You are not a sller")
        try:
            seller=SellerRegistrationForm.objects.get(user=user)
        except:
            raise PermissionDenied ("Cannot find seller id")
        return Order.objects.filter(kitchen_name=seller)
        
    
        
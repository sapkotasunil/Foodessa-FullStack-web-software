from .serializers import orderSerializer
from .models import Order
from rest_framework import generics,permissions



class CreateOrderView(generics.CreateAPIView):
    serializer_class=orderSerializer
    permission_classes=[permissions.IsAuthenticated]
    
    def perform_create(self, serializer):
        user=self.request.user
        serializer.save(buyer_name=user)
    
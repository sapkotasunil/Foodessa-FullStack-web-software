from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .serializer import SellerRegistrationFormSerializers
from rest_framework.views import APIView
from .models import SellerRegistrationForm
from .serializer import kitchenDetailsViewserializer
from rest_framework.response import Response
from rest_framework.exceptions import NotFound


class SellerRegistrationFormView(generics.CreateAPIView):
    serializer_class=SellerRegistrationFormSerializers
    permission_classes=[IsAuthenticated]
    

    def perform_create(self, serializer): # When saving the form, also attach the currently logged-in user to the user field of the model.
        serializer.save(user=self.request.user)
        
class kitchenDetailsView(APIView):
    permission_classes=[IsAuthenticated]
    
    def get(self,request):
        try:
            seller=SellerRegistrationForm.objects.get(user=request.user)
            serializer=kitchenDetailsViewserializer(seller,context={"request":request})
            return Response(serializer.data)
        except SellerRegistrationForm.DoesNotExist:
            raise NotFound("seller profile not found")
    
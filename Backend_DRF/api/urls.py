from django.urls import path
from users.views import UserRegisterView
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
from django.conf import settings
from django.conf.urls.static import static
from users.views import CustomTokenObtainPairView
from seller.views import ItemListCreateView
from seller_registration_data.views import SellerRegistrationFormView
from seller_registration_data.views import kitchenDetailsView

urlpatterns = [
    path('register/',UserRegisterView.as_view()),
    path('token/',  CustomTokenObtainPairView.as_view(), name='token_obtain_pair_that_returns_user_data_with_token'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('seller/register/',SellerRegistrationFormView.as_view(),name='seller_register_form'),
    path('seller/items/',ItemListCreateView.as_view(),name="food_item_fetch_and_stored"),
    path('seller/details/',kitchenDetailsView.as_view(),name="kitchen_details_by_seller_fetched"),
    
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

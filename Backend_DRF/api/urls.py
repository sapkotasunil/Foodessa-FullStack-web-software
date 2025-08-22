from django.urls import path
from users.views import UserRegisterView
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
from django.conf import settings
from django.conf.urls.static import static
from users.views import CustomTokenObtainPairView
from seller.views import ItemListCreateView,BuyerItemListView
from seller_registration_data.views import SellerRegistrationFormView
from seller_registration_data.views import kitchenDetailsView
from orders.views import CreateOrderView,FetchOrderByBuyer,FetchOrderBySeller,OrderStatus

urlpatterns = [
    path('register/',UserRegisterView.as_view()),
    path('token/',  CustomTokenObtainPairView.as_view(), name='token_obtain_pair_that_returns_user_data_with_token'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('seller/register/',SellerRegistrationFormView.as_view(),name='seller_register_form'),
    path('seller/items/',ItemListCreateView.as_view(),name="food_item_fetch_and_stored"),
    path('seller/details/',kitchenDetailsView.as_view(),name="kitchen_details_by_seller_fetched"),
    path('buyer/items/', BuyerItemListView.as_view(), name='public-items'),
    path('buyer/order/', CreateOrderView.as_view(), name='creating_a_order'),
    path('buyer/orders/', FetchOrderByBuyer.as_view(), name='fetch all order by buyer that created '),
    path('seller/orders/', FetchOrderBySeller.as_view(), name='fetching all orders that sumited to that seller'),
    path('seller/order/<int:pk>/', OrderStatus.as_view(), name='Updating Order Status'),

    
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

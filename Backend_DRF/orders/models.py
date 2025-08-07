from django.db import models
from seller_registration_data.models import SellerRegistrationForm
from users.models import  User
from seller.models import Item

class Order(models.Model):
    
    
    class OrderStatus(models.TextChoices):
        PENDING="PENDING","Pending"
        ACCEPT="ACCEPT","Accept"
        CANCEL="CANCEL","Cancel"
        SUCESS="SUCESS","Sucess"
        
    class DeliveryStataus(models.TextChoices):
        PREPARING = 'PREPARING', 'Preparing'
        READY = 'READY', 'Ready'
        OUT_FOR_DELIVERY = 'OUT_FOR_DELIVERY', 'OutForDelivery'
        DELIVERED = 'DELIVERED', 'Delivered'
        FAILED = 'FAILED', 'Failed'
    
    class PaymentStatus(models.TextChoices):
        COD="COD","COD"
        ONLINE="ONLINE","online"
    
    
    kitchen_name=models.ForeignKey(SellerRegistrationForm,on_delete=models.DO_NOTHING,related_name="orders")
    buyer_name=models.ForeignKey(User,on_delete=models.DO_NOTHING, related_name="orders")
    items_name=models.ForeignKey(Item,on_delete=models.DO_NOTHING,related_name="orders_items")
    orderStatus=models.CharField(choices=OrderStatus.choices, default=OrderStatus.PENDING, max_length=20)
    deleveryStatus=models.CharField(choices=DeliveryStataus.choices, default=DeliveryStataus.PREPARING, max_length=20)
    paymentStatus=models.CharField(choices=PaymentStatus.choices, default=PaymentStatus.COD)
    quantity=models.DecimalField(max_digits=4, blank=False,decimal_places=0, null=False)
    totalPrice=models.DecimalField(max_digits=8,blank=False,decimal_places=2,null=False)
    deliveryAddress=models.CharField(max_length=50,blank=False , null=False)
    created_at=models.DateTimeField( auto_now_add=True)
    Status_updated_at=models.DateTimeField(auto_now=True)
    payment=models.ImageField(upload_to="payment" ,null=True ,blank=True)
    
    def __str__(self):
        return f"order #{self.id}--{self.buyer_name.username}--{self.orderStatus}"
    

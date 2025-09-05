from django.contrib import admin
from .models import feedbackModel

class feedbackAdmin(admin.ModelAdmin):
    list_display=["name","email","subject","message"]
    
admin.site.register(feedbackModel,feedbackAdmin)

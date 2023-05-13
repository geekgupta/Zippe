from django.urls import path
from .views import * 
from django.urls import path
from . import views 


urlpatterns = [
    path('api/signup', SignUp.as_view(), name='signup'),
    path('api/login', Login.as_view(), name='login'),
    path('email/opened/<int:email_tracking_id>/', views.Email_opened, name='email_opened'),
    path('api/email-chart/', EmailChartAPI.as_view(), name='email_chart'),


]


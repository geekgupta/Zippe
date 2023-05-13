from django.shortcuts import render,redirect
from rest_framework.response import Response

from django.http import *
from rest_framework.views import APIView
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate , login
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated , AllowAny , IsAuthenticatedOrReadOnly  # <-- Here
from rest_framework.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_200_OK
)

from .models import *
from datetime import timedelta

User = get_user_model()


class SignUp(APIView):
    permission_classes = [AllowAny]
    

    def post(self , request):
        try:
            print(request.data)
            username = request.data.get("email")
            password = request.data.get("password")
            mobile_no = request.data.get("phone")
            if username is None or password is None:
                return Response({'error': 'Please provide both username and password'},status=HTTP_400_BAD_REQUEST)
            user =  Account.objects.create_user(email=username,password=password , mobile_no = mobile_no)
            token, _ = Token.objects.get_or_create(user = user)
            return Response({'token':token.key},status=HTTP_200_OK)
        except Exception as e:
            return Response({'err' : "There was some error while fetching details"},status=HTTP_400_BAD_REQUEST)


class Login(APIView):
    permission_classes = [AllowAny]
    def post(self , request):
        username = request.data.get("email")
        password = request.data.get("password")
        if username is None or password is None:
            return Response({'error': 'Please provide both username and password'},status=HTTP_400_BAD_REQUEST)
        user = authenticate(email=username, password=password)
        if not user:
            return Response({'error': 'Invalid Credentials'},status=HTTP_404_NOT_FOUND)
        token, _ = Token.objects.get_or_create(user=user)
        print("Logged in Successfully!")
        return Response({'token':token.key},status=HTTP_200_OK)
    



def Email_opened(request, email_tracking_id):
    email_tracking = EmailTracking.objects.get(pk=email_tracking_id)
    email_tracking.mark_as_opened()
    return redirect('http://127.0.0.1:5173/') 



from datetime import date

class EmailChartAPI(APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        today = date.today()
        emails_opened_today = EmailTracking.objects.filter(opened_at__date=today).count()
        emails_not_opened_today = EmailTracking.objects.filter(sent_at__date=today).count()
        data = {
            'emails_opened_today': emails_opened_today,
            'emails_not_opened_today': emails_not_opened_today-emails_opened_today,
        }
        return Response(data)

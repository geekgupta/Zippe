from apscheduler.schedulers.background import BackgroundScheduler
from django.core.mail import send_mail
from django.conf import settings
from django.template.loader import render_to_string
from .models import *
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
from .models import *
scheduler = BackgroundScheduler()



def send_morning_email():
    subject = 'Hello from Django!'
    message = 'This is a test email sent from Django.'
    template = render_to_string('goodmorning.html')
    from_email = settings.EMAIL_HOST_USER 
    recipient_list = ['guptron1@gmail.com'] 

    send_mail(subject, message, from_email, recipient_list , html_message=template)

    print("hii purushottam")
    pass


def send_mail_function(subject, message, from_email, recipient_list):
    send_mail(subject, message, from_email, recipient_list)

    for recipient in recipient_list:
        email_tracking = EmailTracking.objects.create(email=recipient)
        email_opened_url = 'http://127.0.0.1:8000/email/opened/'+str(email_tracking.id) # Replace with the actual URL

        message = 'This is a test email sent from Django.'

        template = 'emails/tracked_email_template.html'
        context = {
            'email_opened_url': email_opened_url,
        }
        html_message = render_to_string('goodmorning.html', context)

        send_mail(subject ,message ,  from_email, [recipient], html_message=html_message)

def send_email_to_all_users():
    recipient_list = Account.objects.values_list('email', flat=True)
    subject = 'Hello from Zippe!'
    message = 'This is a test email sent from zippe.'
    from_email = settings.EMAIL_HOST_USER 
    send_mail_function(subject, message, from_email, recipient_list) 
    

# @scheduler.scheduled_job('inter', hour='8')
# def schedule_morning_email():
#     send_morning_email()


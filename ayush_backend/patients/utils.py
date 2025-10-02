# patients/utils.py
import random
from django.conf import settings
from django.core.mail import send_mail
from twilio.rest import Client


def generate_otp(length=6):
    """Generate a random OTP."""
    return ''.join([str(random.randint(0, 9)) for _ in range(length)])


def send_sms_otp(phone_number, otp):
    """Send OTP via Twilio SMS."""
    if not settings.DEBUG:
        try:
            client = Client(settings.TWILIO_ACCOUNT_SID,
                            settings.TWILIO_AUTH_TOKEN)
            message = client.messages.create(
                body=f"Your AYUSH Care verification code is: {otp}",
                from_=settings.TWILIO_PHONE_NUMBER,
                to=phone_number
            )
            print(f"SMS sent to {phone_number}: {message.sid}")
            return True
        except Exception as e:
            print(f"Error sending SMS: {e}")
            return False

    # If in debug mode, just print a message and pretend it was successful.
    print(f"DEBUG MODE: Skipping SMS to {phone_number}. OTP is {otp}")
    return True


def send_email_otp(email, otp):
    """Send OTP via Email."""
    try:
        subject = 'Your AYUSH Care Verification Code'
        message = f'Your verification code is: {otp}'

        # FIX: Use the verified email from settings instead of a hardcoded one
        from_email = settings.DEFAULT_FROM_EMAIL

        recipient_list = [email]
        send_mail(subject, message, from_email, recipient_list)
        print(f"Email sent to {email} from {from_email}")
        return True
    except Exception as e:
        print(f"Error sending email: {e}")
        return False

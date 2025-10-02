# patients/views.py
from rest_framework import generics
from .models import PatientRegistration
from .serializers import PatientRegistrationSerializer
from django.core.cache import cache
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .utils import generate_otp, send_sms_otp, send_email_otp
from django.conf import settings

class PatientRegistrationAPIView(generics.CreateAPIView):
    queryset = PatientRegistration.objects.all()
    serializer_class = PatientRegistrationSerializer


class GenerateOTP(APIView):
    def post(self, request):
        contact = request.data.get('contact')  # This can be phone or email
        otp_type = request.data.get('type')  # 'sms' or 'email'

        if not contact or not otp_type:
            return Response({'error': 'Contact information and type are required.'}, status=status.HTTP_400_BAD_REQUEST)

        otp = generate_otp()
        # Store OTP in cache for 5 minutes (300 seconds)
        cache.set(contact, otp, 300)

        if otp_type == 'sms':
            send_sms_otp(contact, otp)
        elif otp_type == 'email':
            send_email_otp(contact, otp)
        else:
            return Response({'error': 'Invalid OTP type.'}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'message': f'OTP sent to {contact}'}, status=status.HTTP_200_OK)


class VerifyOTP(APIView):
    def post(self, request):
        contact = request.data.get('contact')
        otp_received = request.data.get('otp')

        if not contact or not otp_received:
            return Response({'error': 'Contact information and OTP are required.'}, status=status.HTTP_400_BAD_REQUEST)

        # --- START: Developer Bypass Logic ---
        # If we are in DEBUG mode and the OTP is '000000', succeed immediately.
        if settings.DEBUG and otp_received == '000000':
            print(f"DEBUG MODE: Bypassing OTP verification for {contact}")
            return Response({'message': 'Verification successful (DEBUG bypass).'}, status=status.HTTP_200_OK)
        # --- END: Developer Bypass Logic ---

        # This is your existing, normal verification logic
        otp_stored = cache.get(contact)

        if not otp_stored:
            return Response({'error': 'OTP has expired or is invalid.'}, status=status.HTTP_400_BAD_REQUEST)

        if otp_stored == otp_received:
            cache.delete(contact)
            return Response({'message': 'Verification successful.'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid OTP.'}, status=status.HTTP_400_BAD_REQUEST)

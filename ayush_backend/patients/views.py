# patients/views.py

from django.http import JsonResponse
from django.core.cache import cache
from django.conf import settings
from django.db import transaction

from rest_framework.views import APIView
from rest_framework import generics, status
from rest_framework.response import Response

# Import the new models and serializers correctly
from .models import PractitionerProfile, PatientProfile
from .serializers import UserSerializer, PractitionerProfileSerializer, PatientProfileSerializer
from .utils import generate_otp, send_sms_otp, send_email_otp

# View for the API root URL


def api_home(request):
    return JsonResponse({
        "status": "ok",
        "message": "AYUSH Backend API is running!"
    })

# View for generating and sending OTPs


class GenerateOTP(APIView):
    def post(self, request):
        contact = request.data.get('contact')
        otp_type = request.data.get('type')

        if not contact or not otp_type:
            return Response({'error': 'Contact information and type are required.'}, status=status.HTTP_400_BAD_REQUEST)

        otp = generate_otp()
        cache.set(contact, otp, 300)

        if otp_type == 'sms':
            send_sms_otp(contact, otp)
        elif otp_type == 'email':
            send_email_otp(contact, otp)
        else:
            return Response({'error': 'Invalid OTP type.'}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'message': f'OTP sent to {contact}'}, status=status.HTTP_200_OK)

# View for verifying OTPs


class VerifyOTP(APIView):
    def post(self, request):
        contact = request.data.get('contact')
        otp_received = request.data.get('otp')

        if not contact or not otp_received:
            return Response({'error': 'Contact information and OTP are required.'}, status=status.HTTP_400_BAD_REQUEST)

        if settings.DEBUG and otp_received == '000000':
            print(f"DEBUG MODE: Bypassing OTP verification for {contact}")
            return Response({'message': 'Verification successful (DEBUG bypass).'}, status=status.HTTP_200_OK)

        otp_stored = cache.get(contact)

        if not otp_stored:
            return Response({'error': 'OTP has expired or is invalid.'}, status=status.HTTP_400_BAD_REQUEST)

        if otp_stored == otp_received:
            cache.delete(contact)
            return Response({'message': 'Verification successful.'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid OTP.'}, status=status.HTTP_400_BAD_REQUEST)

# View for Practitioner Registration


class PractitionerRegistrationAPIView(generics.CreateAPIView):
    serializer_class = UserSerializer

    @transaction.atomic
    def create(self, request, *args, **kwargs):
        user_serializer = self.get_serializer(data=request.data)
        user_serializer.is_valid(raise_exception=True)
        user = user_serializer.save()

        # FIX: Populate the first_name and last_name on the User model
        user.first_name = request.data.get('first_name', '')
        user.last_name = request.data.get('last_name', '')
        user.save()

        profile_serializer = PractitionerProfileSerializer(data=request.data)
        profile_serializer.is_valid(raise_exception=True)
        profile_serializer.save(user=user)

        return Response({
            "user": user_serializer.data,
            "profile": profile_serializer.data
        }, status=status.HTTP_201_CREATED)


class PatientRegistrationAPIView(generics.CreateAPIView):
    """
    API view to handle the registration of a new Patient.
    Creates a User and a linked PatientProfile.
    """
    serializer_class = UserSerializer

    @transaction.atomic
    def create(self, request, *args, **kwargs):
        # Step 1: Create the main User account (handles username, email, password)
        user_serializer = self.get_serializer(data=request.data)
        user_serializer.is_valid(raise_exception=True)
        user = user_serializer.save()

        # Step 2: Populate the User's first_name and last_name from the full_name field
        # This ensures the names show up correctly in the Django admin user list.
        full_name = request.data.get('full_name', '').strip()
        name_parts = full_name.split(' ', 1)
        user.first_name = name_parts[0]
        if len(name_parts) > 1:
            user.last_name = name_parts[1]
        user.save()

        # Step 3: Create the Patient Profile and link it to the new User
        profile_serializer = PatientProfileSerializer(data=request.data)
        profile_serializer.is_valid(raise_exception=True)
        # We pass the 'user' object directly to the save() method
        profile_serializer.save(user=user)

        # Step 4: Return a successful response to the frontend
        return Response({
            "message": "Patient registration successful.",
            "user": user_serializer.data,
            "profile": profile_serializer.data
        }, status=status.HTTP_201_CREATED)

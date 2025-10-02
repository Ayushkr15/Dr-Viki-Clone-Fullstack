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

        # We pass the user object directly to the save method, not in the data dict
        profile_serializer = PractitionerProfileSerializer(data=request.data)
        profile_serializer.is_valid(raise_exception=True)

        # FIX: Pass the user object directly into the .save() method here
        profile_serializer.save(user=user)

        return Response({
            "user": user_serializer.data,
            "profile": profile_serializer.data
        }, status=status.HTTP_201_CREATED)


class PatientRegistrationAPIView(generics.CreateAPIView):
    serializer_class = UserSerializer

    @transaction.atomic
    def create(self, request, *args, **kwargs):
        user_serializer = self.get_serializer(data=request.data)
        user_serializer.is_valid(raise_exception=True)
        user = user_serializer.save()

        profile_serializer = PatientProfileSerializer(data=request.data)
        profile_serializer.is_valid(raise_exception=True)

        # FIX: Pass the user object directly into the .save() method here
        profile_serializer.save(user=user)

        return Response({
            "user": user_serializer.data,
            "profile": profile_serializer.data
        }, status=status.HTTP_201_CREATED)

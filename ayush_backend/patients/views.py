from django.http import JsonResponse
from django.core.cache import cache
from django.conf import settings
from django.db import transaction
from django.contrib.auth.models import User
from django.utils.crypto import get_random_string
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import generics, status
from rest_framework.response import Response
from .models import PractitionerProfile, PatientProfile, DegreeCertificate
from .serializers import UserSerializer, PractitionerProfileSerializer, PatientProfileSerializer
from .utils import generate_otp, send_sms_otp, send_email_otp

def api_home(request):
    pass


class GenerateOTP(APIView):
    pass


class VerifyOTP(APIView):
    pass


class PractitionerRegistrationAPIView(generics.CreateAPIView):
    serializer_class = UserSerializer
    parser_classes = (MultiPartParser, FormParser)

    @transaction.atomic
    def create(self, request, *args, **kwargs):
        mutable_data = request.data.copy()
        mutable_data['password'] = get_random_string(12)
        user_serializer = self.get_serializer(data=mutable_data)
        user_serializer.is_valid(raise_exception=True)
        user = user_serializer.save()
        user.set_unusable_password()
        user.first_name = mutable_data.get('first_name', '')
        user.last_name = mutable_data.get('last_name', '')
        user.save()

        profile_serializer = PractitionerProfileSerializer(data=mutable_data)
        profile_serializer.is_valid(raise_exception=True)
        profile = profile_serializer.save(user=user)

        certificate_files = request.FILES.getlist('degree_certificate')
        for cert_file in certificate_files:
            DegreeCertificate.objects.create(
                practitioner_profile=profile, file=cert_file)

        return Response({"message": "Practitioner registration successful."}, status=status.HTTP_201_CREATED)


class PatientRegistrationAPIView(generics.CreateAPIView):
    serializer_class = UserSerializer

    @transaction.atomic
    def create(self, request, *args, **kwargs):
        mutable_data = request.data.copy()
        mutable_data['password'] = get_random_string(12)

        user_serializer = self.get_serializer(data=mutable_data)
        user_serializer.is_valid(raise_exception=True)
        user = user_serializer.save()
        user.set_unusable_password()

        full_name = mutable_data.get('full_name', '').strip()
        name_parts = full_name.split(' ', 1)
        user.first_name = name_parts[0]
        if len(name_parts) > 1:
            user.last_name = name_parts[1]
        user.save()

        profile_serializer = PatientProfileSerializer(data=mutable_data)
        profile_serializer.is_valid(raise_exception=True)
        profile_serializer.save(user=user)

        return Response({"message": "Patient registration successful."}, status=status.HTTP_201_CREATED)

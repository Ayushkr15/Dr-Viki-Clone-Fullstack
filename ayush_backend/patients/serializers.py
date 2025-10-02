# patients/serializers.py

from django.contrib.auth.models import User
from rest_framework import serializers

# Import the NEW, correct model names
from .models import PractitionerProfile, PatientProfile

# Serializer for creating the main User account (username, email, password)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        # This handles secure password hashing
        user = User.objects.create_user(**validated_data)
        return user

# Serializer for the Practitioner Profile data


class PractitionerProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = PractitionerProfile
        # Exclude the 'user' field as we handle it separately in the view
        exclude = ['user']

# Serializer for the Patient Profile data


class PatientProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = PatientProfile
        exclude = ['user']

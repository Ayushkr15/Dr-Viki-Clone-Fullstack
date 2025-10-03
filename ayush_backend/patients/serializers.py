from django.contrib.auth.models import User
from rest_framework import serializers
from .models import PractitionerProfile, PatientProfile

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class PractitionerProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = PractitionerProfile
        exclude = ['user']

class PatientProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = PatientProfile
        exclude = ['user']

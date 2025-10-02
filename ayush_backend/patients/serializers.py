# patients/serializers.py
from rest_framework import serializers
from .models import PatientRegistration


class PatientRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = PatientRegistration
        fields = '__all__'  # This includes all fields from your model

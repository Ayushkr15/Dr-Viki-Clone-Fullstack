# patients/models.py
from django.db import models
from django.conf import settings  # Used to link to the built-in User model


class PractitionerProfile(models.Model):
    # This creates a secure link to a user account (for username, email, password)
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    # Fields from your "Create Your Professional Account" form
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    mobile_number = models.CharField(max_length=20, unique=True)
    specialisation = models.CharField(max_length=100)
    registration_number = models.CharField(max_length=15)
    date_of_birth = models.DateField()
    degree_certificate = models.FileField(
        upload_to='practitioners/certificates/')
    professional_photo = models.ImageField(upload_to='practitioners/photos/')
    current_address = models.TextField()
    state = models.CharField(max_length=100)
    pin_code = models.CharField(max_length=6)
    permanent_address = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Dr. {self.first_name} {self.last_name}"


class PatientProfile(models.Model):
    # Secure link to a master user account
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    # Fields from your "Patient Registration" form (Seeking.tsx)
    full_name = models.CharField(max_length=255)
    date_of_birth = models.DateField()
    gender = models.CharField(max_length=50)
    phone_number = models.CharField(max_length=20, unique=True)
    marital_status = models.CharField(max_length=50, blank=True)
    occupation = models.CharField(max_length=100, blank=True)
    address = models.TextField(blank=True)

    # You can add more fields from the other steps (lifestyle, medical history) here
    # For example:
    smoking_status = models.CharField(max_length=50, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.full_name

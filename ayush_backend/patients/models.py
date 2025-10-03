from django.db import models
from django.conf import settings

class PractitionerProfile(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    mobile_number = models.CharField(max_length=20, unique=True)
    specialisation = models.CharField(max_length=100)
    registration_number = models.CharField(max_length=15)
    date_of_birth = models.DateField()
    professional_photo = models.ImageField(upload_to='practitioners/photos/')
    current_address = models.TextField()
    state = models.CharField(max_length=100)
    pin_code = models.CharField(max_length=6)
    permanent_address = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Dr. {self.first_name} {self.last_name}"


class DegreeCertificate(models.Model):
    practitioner_profile = models.ForeignKey(
        PractitionerProfile, related_name='degree_certificates', on_delete=models.CASCADE)
    file = models.FileField(upload_to='practitioners/certificates/')

    def __str__(self):
        return f"Certificate for {self.practitioner_profile.user.username}"


class PatientProfile(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    full_name = models.CharField(max_length=255)
    date_of_birth = models.DateField()
    gender = models.CharField(max_length=50)
    phone_number = models.CharField(max_length=20, unique=True)
    marital_status = models.CharField(max_length=50, blank=True)
    occupation = models.CharField(max_length=100, blank=True)
    address = models.TextField(blank=True)
    smoking_status = models.CharField(max_length=50, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.full_name

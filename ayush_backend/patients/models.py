# patients/models.py
from django.db import models


class PatientRegistration(models.Model):
    # Step 1: Personal Information
    full_name = models.CharField(max_length=255)
    date_of_birth = models.DateField()
    gender = models.CharField(max_length=50)
    phone_number = models.CharField(max_length=20)
    email = models.EmailField()
    address = models.TextField(blank=True, null=True)

    # Step 2: Lifestyle History
    smoking_status = models.CharField(max_length=50, blank=True)
    alcohol_consumption = models.CharField(max_length=255, blank=True)
    dietary_habits = models.TextField(blank=True)

    # Step 3: Medical History
    past_medical_conditions = models.TextField(blank=True)
    current_medications = models.TextField(blank=True)
    allergies = models.TextField(blank=True)

    # Step 4: Current Health Status
    height_cm = models.FloatField(blank=True, null=True)
    weight_kg = models.FloatField(blank=True, null=True)
    present_symptoms = models.TextField(blank=True)

    # Step 5: Psychometric Assessment (Simplified for now)
    psychometric_summary = models.TextField(blank=True)

    # Step 6: AYUSH Profile
    vata_score = models.IntegerField(blank=True, null=True)
    pitta_score = models.IntegerField(blank=True, null=True)
    kapha_score = models.IntegerField(blank=True, null=True)

    # Step 7: Image Uploads
    tongue_image = models.ImageField(upload_to='images/tongue/', blank=True)
    eye_image = models.ImageField(upload_to='images/eyes/', blank=True)

    # Submission timestamp
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.full_name

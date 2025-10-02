# patients/admin.py
from django.contrib import admin
from .models import PatientRegistration

admin.site.register(PatientRegistration)

# patients/admin.py

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User

# Import the NEW model names
from .models import PractitionerProfile, PatientProfile

# Define an inline admin descriptor for Practitioner Profile


class PractitionerProfileInline(admin.StackedInline):
    model = PractitionerProfile
    can_delete = False
    verbose_name_plural = 'Practitioner Profile'

# Define an inline admin descriptor for Patient Profile


class PatientProfileInline(admin.StackedInline):
    model = PatientProfile
    can_delete = False
    verbose_name_plural = 'Patient Profile'

# Define a new User admin that includes the profile inlines


class UserAdmin(BaseUserAdmin):
    inlines = [PractitionerProfileInline, PatientProfileInline]


# Re-register UserAdmin to use our custom version
admin.site.unregister(User)
admin.site.register(User, UserAdmin)

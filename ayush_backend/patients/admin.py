# patients/admin.py

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User
from .models import PractitionerProfile, PatientProfile


class PractitionerProfileInline(admin.StackedInline):
    model = PractitionerProfile
    can_delete = False
    verbose_name_plural = 'Practitioner Profile'


class PatientProfileInline(admin.StackedInline):
    model = PatientProfile
    can_delete = False
    verbose_name_plural = 'Patient Profile'

# Define a new User admin


class UserAdmin(BaseUserAdmin):
    inlines = [PractitionerProfileInline, PatientProfileInline]

    # These are the columns that will be displayed in the user list
    list_display = ('username', 'email', 'first_name', 'last_name',
                    'is_staff', 'get_profile_type', 'get_phone_number')

    # These fields will be searchable
    search_fields = ('username', 'first_name', 'last_name', 'email')

    # This adds a filter sidebar
    list_filter = ('is_staff', 'is_superuser', 'is_active', 'groups')

    # Custom functions to get data from the related profiles
    @admin.display(description='Profile Type')
    def get_profile_type(self, obj):
        if hasattr(obj, 'practitionerprofile'):
            return "Practitioner"
        if hasattr(obj, 'patientprofile'):
            return "Patient"
        return "N/A"

    @admin.display(description='Phone Number')
    def get_phone_number(self, obj):
        if hasattr(obj, 'practitionerprofile'):
            return obj.practitionerprofile.mobile_number
        if hasattr(obj, 'patientprofile'):
            return obj.patientprofile.phone_number
        return "N/A"


# Re-register UserAdmin
admin.site.unregister(User)
admin.site.register(User, UserAdmin)

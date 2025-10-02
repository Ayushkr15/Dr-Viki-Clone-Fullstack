# ayush_backend/urls.py

from django.contrib import admin
from django.urls import path
# Make sure all views are imported correctly
from patients.views import (
    api_home,
    GenerateOTP,
    VerifyOTP,
    PractitionerRegistrationAPIView,
    PatientRegistrationAPIView
)
# For serving media files in development
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    # Main and Admin URLs
    path('', api_home, name='api-home'),
    path('admin/', admin.site.urls),

    # OTP URLs
    path('api/otp/generate/', GenerateOTP.as_view(), name='generate-otp'),
    path('api/otp/verify/', VerifyOTP.as_view(), name='verify-otp'),

    # Registration URLs
    path('api/register/practitioner/',
         PractitionerRegistrationAPIView.as_view(), name='practitioner-register'),
    path('api/register/patient/', PatientRegistrationAPIView.as_view(),
         name='patient-register'),
]

# This is required to serve uploaded files (like photos/certificates) during development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)

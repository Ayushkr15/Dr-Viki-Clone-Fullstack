from django.contrib import admin
from django.urls import path
from patients.views import (
    api_home,
    GenerateOTP,
    VerifyOTP,
    PractitionerRegistrationAPIView,
    PatientRegistrationAPIView
)
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', api_home, name='api-home'),
    path('admin/', admin.site.urls),
    path('api/otp/generate/', GenerateOTP.as_view(), name='generate-otp'),
    path('api/otp/verify/', VerifyOTP.as_view(), name='verify-otp'),
    path('api/register/practitioner/',
         PractitionerRegistrationAPIView.as_view(), name='practitioner-register'),
    path('api/register/patient/', PatientRegistrationAPIView.as_view(),
         name='patient-register'),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)

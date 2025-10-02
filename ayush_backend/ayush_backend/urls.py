from django.contrib import admin
from django.urls import path
from patients.views import GenerateOTP, VerifyOTP  # Import new views

urlpatterns = [
    path('admin/', admin.site.urls),
    # path('api/register/', PatientRegistrationAPIView.as_view(), name='patient-register'), # Keep this for later
    path('api/otp/generate/', GenerateOTP.as_view(), name='generate-otp'),
    path('api/otp/verify/', VerifyOTP.as_view(), name='verify-otp'),
]

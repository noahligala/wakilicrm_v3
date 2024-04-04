from django.urls import include, path
### rom django.contrib import admin  # Corrected import statement

from .views import BillingListCreateAPIView, BillingRetrieveUpdateDestroyAPIView

urlpatterns = [
    ### path('admin/', admin.site.urls),  # Corrected import statement
    ### path('accounts/', include('django.contrib.auth.urls')),  # Django built-in login/logout URLs
    ### path('dashboard/', include('dashboard.urls')),  # URL for the main dashboard
    path('billings/', BillingListCreateAPIView.as_view(), name='billing-list-create'),
    path('billings/<int:pk>/', BillingRetrieveUpdateDestroyAPIView.as_view(), name='billing-detail'),
    # Define URLs for other finance-related models
]

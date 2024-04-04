from django import views
from django.contrib import admin
from django.contrib.auth.models import User
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from cases import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('cases.urls')),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/finance/', include('finance_crm.urls')),
    path('accounts/', include('django.contrib.auth.urls')),
    path('api/login/', views.login_view, name='login'),
    path('api/logout/', views.logout_view, name='login'),
    path('api/health-check/', views.health_check, name='health-check'),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]


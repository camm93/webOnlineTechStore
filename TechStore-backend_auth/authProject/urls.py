from django.contrib import admin
from django.urls import include, path
from rest_framework_simplejwt.views import (TokenObtainPairView, TokenRefreshView)
from authApp import views


user_patterns = [
    path('', views.UserCreateView.as_view()),
    path('<int:pk>/', views.UserDetailView.as_view()),
    path('update/<int:pk>/', views.UserUpdateView.as_view()),
    path('delete/<int:pk>/', views.UserDeleteView.as_view()),
]

urlpatterns = [
    path('admin/', admin.site.urls),
    path('login/', TokenObtainPairView.as_view()),
    path('refresh/', TokenRefreshView.as_view()),
    path('user/', include(user_patterns)),
    path('verifyToken/', views.VerifyTokenView.as_view()),
]

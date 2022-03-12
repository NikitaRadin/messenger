from django.urls import path, include
from authorization import views


urlpatterns = [
    path('register/', views.Register.as_view()),
    path('confirm_email/', views.ConfirmEmail.as_view())
]

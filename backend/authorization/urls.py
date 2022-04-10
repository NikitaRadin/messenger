from django.urls import path, include
from authorization import views


urlpatterns = [
    path('profile/', views.Profile.as_view()),
    path('login/', views.Login.as_view()),
    path('register/', views.Register.as_view())
]

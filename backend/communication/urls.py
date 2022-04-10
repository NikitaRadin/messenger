from django.urls import path
from communication.views import SearchForUser


urlpatterns = [
    path('search-for-user/', SearchForUser.as_view())
]

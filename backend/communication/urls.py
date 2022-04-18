from django.urls import path
from communication.views import SearchForUser, Conversations


urlpatterns = [
    path('search-for-user/', SearchForUser.as_view()),
    path('conversations/', Conversations.as_view())
]

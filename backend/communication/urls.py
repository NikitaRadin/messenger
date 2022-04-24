from django.urls import path
from communication.views import SearchForUser, Conversations


urlpatterns = [
    path('search-for-user/', SearchForUser.as_view()),
    path('conversations/', Conversations.as_view({
        'get': 'list',
        'post': 'create'
    })),
    path('conversations/<int:user_id>/', Conversations.as_view({
        'get': 'retrieve'
    }))
]

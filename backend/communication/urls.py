from django.urls import path
from communication.views import SearchForUser, Conversations, Messages


urlpatterns = [
    path('search-for-user/', SearchForUser.as_view()),
    path('conversations/', Conversations.as_view({
        'get': 'list',
        'post': 'create'
    })),
    path('conversations/<int:user_id>/', Conversations.as_view({
        'get': 'retrieve'
    })),
    path('messages/<int:conversation_id>/', Messages.as_view({
        'get': 'list',
        'post': 'create'
    }))
]

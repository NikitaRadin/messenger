from rest_framework import generics, viewsets
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from communication.serializers import UserSerializer, ConversationSerializer
from rest_framework.filters import SearchFilter
from communication.models import Conversation
from django.http import Http404


class SearchForUser(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer
    filter_backends = [SearchFilter]
    search_fields = ['^first_name', '^last_name']

    def get_queryset(self):
        return User.objects.exclude(id=self.request.user.id)


class Conversations(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = ConversationSerializer

    def get_queryset(self):
        return Conversation.objects.filter(users=self.request.user)
    
    def get_object(self):
        try:
            obj = Conversation.objects\
                .filter(users=self.request.user)\
                .filter(users=self.kwargs['user_id'])\
                .get()
        except Conversation.DoesNotExist:
            raise Http404('No Conversation matches the given query.')
        return obj

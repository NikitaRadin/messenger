from rest_framework import generics, viewsets
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from communication.serializers import UserSerializer, ConversationSerializer, MessageSerializer
from rest_framework.filters import SearchFilter
from communication.models import Conversation, Message
from django.http import Http404
from django.shortcuts import get_object_or_404


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


class Messages(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = MessageSerializer

    def get_conversation(self):
        return get_object_or_404(
            self.request.user.conversation_set.all(),
            id=self.kwargs['conversation_id']
        )

    def get_queryset(self):
        conversation = self.get_conversation()
        return Message.objects.filter(to_conversation=conversation)

    def perform_create(self, serializer):
        conversation = self.get_conversation()
        serializer.save(
            from_user=self.request.user,
            to_conversation=conversation
        )

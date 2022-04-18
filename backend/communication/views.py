from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from communication.serializers import UserSerializer, ConversationSerializer
from rest_framework.filters import SearchFilter
from communication.generics import RetrieveCreateAPIView 
from communication.models import Conversation
from django.http import Http404


class SearchForUser(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = UserSerializer
    filter_backends = [SearchFilter]
    search_fields = ['^first_name', '^last_name']


class Conversations(RetrieveCreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Conversation.objects.all()
    serializer_class = ConversationSerializer
    
    def get_object(self):
        try:
            obj = Conversation.objects\
                .filter(users=self.request.user.id)\
                .filter(users=self.request.query_params.get('user_id'))\
                .get()
        except Conversation.DoesNotExist:
            raise Http404('No Conversation matches the given query.')
        return obj

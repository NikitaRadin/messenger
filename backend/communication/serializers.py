from rest_framework import serializers
from django.contrib.auth.models import User
from communication.models import Conversation


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name']


class ConversationSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    users = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), many=True, write_only=True)

    class Meta:
        model = Conversation
        fields = ['id', 'name', 'users']

    def get_name(self, obj):
        current_user = self.context['request'].user
        interlocutor = obj.users.exclude(id=current_user.id).get()
        return f'{interlocutor.username} ({interlocutor.first_name} {interlocutor.last_name})'

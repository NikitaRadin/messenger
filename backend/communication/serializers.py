from rest_framework import serializers
from django.contrib.auth.models import User
from communication.models import Conversation


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name']


class ConversationUsersField(serializers.PrimaryKeyRelatedField):
    def to_representation(self, value):
        return value.username


class ConversationSerializer(serializers.ModelSerializer):
    users = ConversationUsersField(queryset=User.objects.all(), many=True)

    class Meta:
        model = Conversation
        fields = ['id', 'users']

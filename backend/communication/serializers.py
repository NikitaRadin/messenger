from rest_framework import serializers
from django.contrib.auth.models import User
from communication.models import Conversation, Message


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

    def create(self, validated_data):
        conversation = Conversation()
        conversation.save()
        conversation.users.set(validated_data['users'])
        current_user = self.context['request'].user
        conversation.users.add(current_user)
        return conversation


class MessageSerializer(serializers.ModelSerializer):
    is_incoming = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Message
        fields = ['is_incoming', 'text', 'date_time', 'read']

    def get_is_incoming(self, obj):
        current_user = self.context['request'].user
        return obj.from_user != current_user

from rest_framework import serializers
from django.contrib.auth.models import User


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email']


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=150)


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email']


class AuthenticationCodeSerializer(serializers.Serializer):
    user_id = serializers.IntegerField(min_value=1)
    code = serializers.RegexField(regex='^[0-9]{6}$')

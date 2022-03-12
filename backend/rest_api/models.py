from django.db import models
from django.contrib.auth.models import User


class AuthenticationCode(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    encrypted = models.CharField(max_length=100)

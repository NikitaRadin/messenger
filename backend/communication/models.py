from django.db import models
from django.contrib.auth.models import User


class Conversation(models.Model):
    users = models.ManyToManyField(User)

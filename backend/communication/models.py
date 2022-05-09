from django.db import models
from django.contrib.auth.models import User


class Conversation(models.Model):
    users = models.ManyToManyField(User)


class Message(models.Model):
    from_user = models.ForeignKey(User, on_delete=models.CASCADE)
    to_conversation = models.ForeignKey(Conversation, on_delete=models.CASCADE)
    text = models.TextField(max_length=1000)
    date_time = models.DateTimeField(auto_now_add=True)
    read = models.BooleanField(default=False)

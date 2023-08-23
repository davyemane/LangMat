from django.db import models 
from django.contrib.auth.models import AbstractUser
from formation.models import Langue

class User(AbstractUser):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    username= None
    email = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    langue = models.ForeignKey(Langue, on_delete=models.CASCADE, default='1')

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []


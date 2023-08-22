from django.contrib import admin
from .models import *
# Register your models here.


admin.site.register(Langue)
admin.site.register(Theme)
admin.site.register(NiveauFormation)
admin.site.register(Dialogue,AdminDialogue)
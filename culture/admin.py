from django.contrib import admin
from culture.models import *

#affichage des tables dans django administration
admin.site.register(Conte)
admin.site.register(Langue)
admin.site.register(Proverbe)
admin.site.register(Chant)


# Register your models here.

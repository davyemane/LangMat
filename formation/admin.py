from django.contrib import admin
from formation.models import *

admin.site.register(Langue)
admin.site.register(Theme)
admin.site.register(NiveauFormation)
admin.site.register(Dialogue)
admin.site.register(VerbeFr)
admin.site.register(TempsVerbaux)
admin.site.register(Conjuguer)
admin.site.register(Regles)
admin.site.register(ChampLexicale)
admin.site.register(MotFr)
admin.site.register(Contenir)

admin.site.register(Traduires)

# Register your models here.

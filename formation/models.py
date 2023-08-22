from django.db import models
from django.db.models import Q

class ChampQuerySet(models.QuerySet):
    def search(self, query, user= None):
        return self.filter(NomChamp__icontains=query)

class ChampManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset()

    def search(self, query, user=None):
        Lookup= Q(NomChamp__icontains=query)
        qs = self.filter(Lookup)
        return self.get_queryset().search(query, user)




class Langue(models.Model):
    id_langue = models.AutoField(null=False, primary_key=True)
    libelleLangue=models.TextField(null= False)
    def __str__(self):
        return self.libelleLangue 

class Theme(models.Model):
    id_theme = models.AutoField(null=False, primary_key=True)
    libelleThem=models.TextField(null= False)
    def __str__(self):
        return self.libelleThem

class NiveauFormation (models.Model):
    id_Niveau = models.AutoField(null=False, primary_key=True)
    libelleNiveauFormation=models.TextField(null= False)
    def __str__(self):
        return self.libelleNiveauFormation

class Dialogue (models.Model):
    id_Themes=models.ForeignKey(Theme, null=False, on_delete=models.CASCADE)
    id_Niveau = models.ForeignKey(NiveauFormation, null=False, on_delete=models.CASCADE)
    id_Langue = models.ForeignKey(Langue, null=False, on_delete=models.CASCADE)
    id_Dialogue = models.AutoField(null=False, primary_key=True)
    libelleDialogue = models.TextField(null=True)
    audio = models.FileField(upload_to='public/Dialogue', null=True)
    regles = models.TextField(null=True)
    def __str__(self):
        return self.libelleDialogue

class VerbeFr(models.Model):
    id_Verbe = models.AutoField(null=False, primary_key=True)
    libelleVerbe = models.TextField(null=True)
    def __str__(self):
        return self.libelleVerbe


class TempsVerbaux(models.Model):
    id_TempsVerbaux = models.IntegerField(null=False, primary_key=True)
    libelleTempsVerbaux = models.TextField(null=False)
    def __str__(self):
        return self.libelleTempsVerbaux

class Conjuguer (models.Model):
    id_Conjuguer = models.AutoField(null=False, primary_key=True)
    langue = models.ForeignKey(Langue, null=False, on_delete=models.CASCADE)
    id_TempsVerbaux = models.ForeignKey(TempsVerbaux, null=False, on_delete=models.CASCADE)
    id_Verbe = models.ForeignKey(VerbeFr, null=False, on_delete=models.CASCADE)
    libelleConjuguer = models.TextField(null=False)
    def __str__(self):
        return self.libelleConjuguer


class Regles(models.Model):
    id_Regles = models.AutoField(null=False, primary_key=True)
    langue = models.ForeignKey(Langue, null=False, on_delete=models.CASCADE)
    id_TempsVerbaux = models.ForeignKey(TempsVerbaux, null=False, on_delete=models.CASCADE)
    libelleRegles = models.TextField(null=False)
    def __str__(self):
        return self.libelleRegles


class ChampLexicale(models.Model):
    id_ChampLexicale = models.AutoField(null=False, primary_key=True)
    NomChamp = models.TextField(null=False)
    Nivform = models.ForeignKey(NiveauFormation, null=False, on_delete=models.CASCADE, default=1, related_name='niveau' )

    objects = ChampManager( )
    def __str__(self):
        return self.NomChamp

class MotFr (models.Model):
    id_Mot = models.AutoField(null=False, primary_key=True)
    ecriture = models.TextField(null=True)
    definition = models.TextField()
    def __str__(self):
        return self.ecriture

class Contenir (models.Model):
    id_Contenir = models.AutoField(null=False, primary_key=True)
    NomChamp = models.ForeignKey(ChampLexicale, null=False, on_delete=models.CASCADE,related_name='champ')
    id_Mot = models.ForeignKey(MotFr, null=False, on_delete=models.CASCADE, related_name='mots')
    corpus = models.TextField(default="")
    tradCorpus = models.TextField(default="")
    def __str__(self):
        return self.NomChamp

class Traduires (models.Model):
    id_Traduire = models.AutoField(null=False, primary_key=True)
    id_Mot = models.ForeignKey(MotFr, null=False, on_delete=models.CASCADE, related_name='Traduction')
    langue = models.ForeignKey(Langue, null=False, on_delete=models.CASCADE, related_name='tradLang')
    audio = models.FileField(upload_to='public/motTraduit', null=True)
    motTraduit= models.CharField(max_length=100, default=1)
    def __str__(self):
        return self.motTraduit

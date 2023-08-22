from django.conf import settings
from django.db import models
from django.contrib import admin

class Langue(models.Model):
    id_langue = models.AutoField(null=False, primary_key=True)
    libelleLangue=models.TextField(null= False)
    paysLangue=models.TextField(null= False, default="Cameroun")
    drapeauPaysLangue=models.FileField(upload_to='public/drapeauPays', null=True, blank=True)
    def __str__(self):
        return self.libelleLangue

class Theme(models.Model):
    id_theme = models.AutoField(null=False, primary_key=True)
    libelleTheme=models.TextField(null= False)
    def __str__(self):
        return self.libelleTheme

class NiveauFormation (models.Model):
    id_Niveau = models.AutoField(null=False, primary_key=True)
    libelleNiveauFormation=models.TextField(null= False)
    
    def __str__(self):
        return self.libelleNiveauFormation

class Dialogue (models.Model):
    id_Dialogue = models.AutoField(null=False, primary_key=True)
    titreDialogue=models.TextField(null= False)
    ecritureDialogueLangue=models.TextField(null= False)
    ecritureDialogueFrançais=models.TextField(null= False)
    audioDialogue= models.FileField(upload_to='public/audioDialogue', null=True, blank=True)
    langue = models.ForeignKey(Langue, null=False, on_delete=models.CASCADE, default=1)
    theme = models.ForeignKey(Theme, null=False, on_delete=models.CASCADE, default=1)
    niveauFormation=models.ForeignKey(NiveauFormation, null=False, on_delete=models.CASCADE, default=1)
    imageIllustrative=models.FileField(upload_to='public/iconeDialogue', null=True, blank=True)
    regleUsage=models.TextField(null=True)
    def __str__(self):
        return self.titreDialogue
    
class AdminDialogue(admin.ModelAdmin):
    list_display=('id_Dialogue','titreDialogue','ecritureDialogueLangue','ecritureDialogueFrançais','audioDialogue','langue','theme','niveauFormation')
    list_filter=('titreDialogue',)
    search_fields=['titreDialogue']

class Utilisateur (models.Model):
    id_utilisateur = models.AutoField(null=False, primary_key=True)
    nom=models.TextField(null= False)
    prenom = models.TextField(null= False)
    email = models.TextField(null= False)
    motDePasse=models.TextField(null= False)
    statut=models.TextField(null= False)


class Enseignement (models.Model):
    id_tuple = models.AutoField(null=False, primary_key=True)
    utilisateur=models.ForeignKey(Utilisateur, null=False, on_delete=models.CASCADE, default=1)
    langue = models.ForeignKey(Langue, null=False, on_delete=models.CASCADE, default=1)
    niveau = models.ForeignKey(NiveauFormation, null=False, on_delete=models.CASCADE, default=1)
    
class Responsable (models.Model):
    id_tuple = models.AutoField(null=False, primary_key=True)
    utilisateur=models.ForeignKey(Utilisateur, null=False, on_delete=models.CASCADE, default=1)
    langue = models.ForeignKey(Langue, null=False, on_delete=models.CASCADE, default=1)

class Evaluation (models.Model):
    id_question = models.AutoField(null=False, primary_key=True)
    question=models.TextField(null= False)
    réponse = models.TextField(null= False)
    proposition1 = models.TextField(null= False)
    proposition2= models.TextField(null= False)
    proposition3 = models.TextField(null= False)
    langue = models.ForeignKey(Langue, null=False, on_delete=models.CASCADE, default=1)
    niveau = models.ForeignKey(NiveauFormation, null=False, on_delete=models.CASCADE, default=1)
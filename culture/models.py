from django.db import models


# Create your models here.
class Langue(models.Model):
    idLangue= models.AutoField(primary_key=True, null=False)
    nomLangue= models.CharField(null=False, max_length=200)
    def __str__(self) :
        return self.nomLangue
    

class Conte(models.Model):
    idConte= models.AutoField(primary_key=True, null=False)
    nomConte= models.CharField(null=False, max_length=200)
    descriptionConte= models.TextField(null=False)
    audioConte= models.FileField(upload_to='public/audioconte', blank=True)
    traductionFrancais= models.TextField(default=1)
    idLangue= models.ForeignKey(Langue, null=False, related_name='contelangue', on_delete=models.CASCADE)
    def __str__(self) :
        return self.nomConte
    
class Proverbe(models.Model):
    idProverbe= models.AutoField(primary_key=True, null=False)
    theme= models.CharField(default=1, max_length=200)
    audioProverbe= models.FileField(upload_to='public/audioProverbe', blank=True)
    descriptionProverbe= models.TextField(null=False)
    traductionFrancais= models.TextField(default=1)
    idLangue= models.ForeignKey(Langue, null=False, related_name='proverbelangue', on_delete=models.CASCADE)
    def __str__(self) :
        return self.descriptionProverbe
    
class Chant(models.Model):
    idChant= models.AutoField(primary_key=True, null=False)
    nomChant= models.CharField(null=False, max_length=200)
    audioChant= models.FileField(upload_to='public/audiochant', blank=True)
    parole= models.TextField(default=1)
    traductionFrancais= models.TextField(default=1)
    idLangue= models.ForeignKey(Langue, null=False, related_name='chantlangue',on_delete=models.CASCADE)
    def __str__(self) :
        return self.nomChant
    
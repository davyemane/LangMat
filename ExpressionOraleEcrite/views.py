from django.shortcuts import render
from rest_framework import generics
from .serializer import *
from .models import *
from django.contrib.auth.models import User
#afficher les élements de la table dialogue
class ListeDialogue(generics.ListAPIView):
    queryset = Dialogue.objects.all()
    serializer_class= DialogueSerializer

#afficher les élements de la table dialogue et présenter le formulaire ppur insérer de nouvelles lignes
class AjoutDialogue(generics.CreateAPIView):
    queryset = Dialogue.objects.all()
    serializer_class= DialogueSerializer

#afficher les détails d'un élement en particulier de la table dialogue
class DetailDialogue(generics.RetrieveAPIView):
    queryset = Dialogue.objects.all()
    serializer_class= DialogueSerializer

#modifier un élement en particulier de la table dialogue
class ModifDialogue(generics.RetrieveUpdateAPIView):
    queryset = Dialogue.objects.all()
    serializer_class= DialogueSerializer

#supprimer un élement en particulier de la table dialogue
class SupprimeDialogue(generics.RetrieveDestroyAPIView):
    queryset = Dialogue.objects.all()
    serializer_class= DialogueSerializer

#afficher les élements de la table niveau de formation
class ListeNiveauFormation(generics.ListAPIView):
    queryset = NiveauFormation.objects.all()
    serializer_class= NiveauFormationSerializer

#afficher un élement de la table niveau de formation
class DetailsNiveauFormation(generics.RetrieveAPIView):
    queryset = NiveauFormation.objects.all()
    serializer_class= NiveauFormationSerializer
    
#afficher les élements de la table des Thèmes
class ListeTheme(generics.ListAPIView):
    queryset = Theme.objects.all()
    serializer_class= ThemeSerializer

#afficher les détails sur les langues apprises par les utilisateurs 
class DetailsEnseignement(generics.ListAPIView):
    queryset = Enseignement.objects.all()
    serializer_class= EnseignementSerializer
   
#afficher les détails sur les informations de l'utilisateur
class DetailsUtilisateur(generics.RetrieveAPIView):
    queryset = Utilisateur.objects.all()
    serializer_class= UtilisateurSerializer
     #lookup_field='utilisateur'

#afficher les détails sur les informations sur une langue
class DetailsLangue(generics.RetrieveAPIView):
    queryset = Langue.objects.all()
    serializer_class=LangueSerializer

#insérer de nouvelles question du test d'évaluation
class AjoutTest(generics.CreateAPIView):
    queryset = Evaluation.objects.all()
    serializer_class= EvaluationSerializer


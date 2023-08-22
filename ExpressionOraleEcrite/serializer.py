from rest_framework import serializers
from .models import * 

class DialogueSerializer(serializers.ModelSerializer):
    class Meta:
        model=Dialogue 
        fields= ('id_Dialogue','titreDialogue','ecritureDialogueLangue','ecritureDialogueFrançais','audioDialogue','langue','theme','niveauFormation','imageIllustrative','regleUsage')

class NiveauFormationSerializer(serializers.ModelSerializer):
    class Meta:
        model=NiveauFormation
        fields= ('id_Niveau','libelleNiveauFormation')
    
class ThemeSerializer(serializers.ModelSerializer):
    class Meta:
        model=Theme
        fields= ('id_theme','libelleTheme')

class UtilisateurSerializer (serializers.ModelSerializer):
    class Meta:
        model=Utilisateur
        fields=('id_utilisateur','prenom','statut')

class EnseignementSerializer (serializers.ModelSerializer):
    class Meta:
        model=Enseignement
        fields=('id_tuple','utilisateur','langue','niveau')

class LangueSerializer (serializers.ModelSerializer):
    class Meta:
        model=Langue
        fields=('id_langue','libelleLangue','paysLangue','drapeauPaysLangue')

class ResponsableSerializer (serializers.ModelSerializer):
    class Meta:
        model=Responsable
        fields=('id_tuple','utilisateur','langue')

class EvaluationSerializer (serializers.ModelSerializer):
    class Meta:
        model=Evaluation
        fields=('id_question','question','proposition1','proposition2','proposition3')
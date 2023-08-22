from rest_framework import serializers
from .models import *


class TraductionSerializer(serializers.ModelSerializer):
    class Meta:
        model= Traduires
        fields = ['langue','audio','motTraduit']

class MotFrSerializer(serializers.ModelSerializer):
    ecriture=serializers.CharField()
    Traduction = TraductionSerializer(read_only= True, many=True) 
    class Meta:
        model= MotFr 
        fields = ["id_Mot","ecriture","Traduction",] 



#table contenir
class ContenuSerializer(serializers.ModelSerializer):
    champ = serializers.CharField(source="NomChamp.NomChamp", read_only=True, )
    mots = MotFrSerializer(source='id_Mot' ,read_only=True)
    url_Delete = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model= Contenir 
        fields=["id_Contenir","corpus","tradCorpus","champ","mots","url_Delete",]
    
    def get_url_Delete(self, obj):
        return f"formation/champ/destroy/{obj.pk}"

   # def get_mots(self,obj):
   #     return{'mot_francais':obj.id_Mot.ecriture, 'id':obj.id_Mot.pk}

class ContenusSerializer(serializers.ModelSerializer):
    #champ = serializers.CharField(source="NomChamp.NomChamp", read_only=True, )

    class Meta:
        model= Contenir 
        fields="__all__"



#Table contenant les champs lexicaux
class ChampsSerializer(serializers.ModelSerializer):
    champ = ContenuSerializer(source="NomChamp", many=True)
    url = serializers.SerializerMethodField(read_only=True)
    url_update = serializers.SerializerMethodField(read_only=True)
    url_Delete = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model= ChampLexicale
        fields= ("id_ChampLexicale","NomChamp",'champ',"Nivform","url","url_update","url_Delete",)
    
    def get_url(self, obj):
        return f"formation/champ/?NomChamp={obj.pk}"
    def get_url_update(self, obj):
        return f"formation/champ_Update/{obj.pk}"
    def get_url_Delete(self, obj):
        return f"formation/champ_destroy/{obj.pk}"



class ChampSerializer(serializers.ModelSerializer):
    Niv = serializers.CharField(source="Nivform.libelleNiveauFormation", read_only=True)
    champ = ContenuSerializer(read_only=True, many=True)
    class Meta:
        model= ChampLexicale
        fields= ["Niv","champ", "NomChamp", "Nivform",]


#Table des Niveaux
class NiveauSerializer(serializers.ModelSerializer):
    #niveau = ChampSerializer(read_only=True, many=True)
    class Meta:
        model= NiveauFormation
        fields="__all__"
from rest_framework import serializers
from .models import *
from rest_framework.reverse import reverse

class ConteSerializer(serializers.ModelSerializer):
     url=serializers.SerializerMethodField(read_only=True)
     class Meta:
        model= Conte
        fields= ["url","idConte","nomConte","audioConte","descriptionConte","traductionFrancais","idLangue"]

     def get_url(self,obj):
        request=self.context.get('request')
        if request is None:
                return None
        return f"/cultures/culture/conte/{obj.pk}/"

class ProverbeSerializer(serializers.ModelSerializer):
     class Meta:
        model= Proverbe
        fields= ["idProverbe","theme","descriptionProverbe","traductionFrancais","idLangue"]
    
    
class ChantSerializer(serializers.ModelSerializer):
     class Meta:
        model= Chant
        fields= ["idChant","nomChant","audioChant","parole","traductionFrancais","idLangue"]
    


class LangueSerializer(serializers.ModelSerializer):
    contelangue = ConteSerializer(read_only=True, many=True)
    proverbelangue= ProverbeSerializer(read_only=True, many=True)
    chantlangue= ChantSerializer(read_only=True, many=True)
    class Meta:
        model= Langue
        fields= ["idLangue","nomLangue","contelangue","proverbelangue","chantlangue"]

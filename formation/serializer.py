from .models import *
from rest_framework import serializers
from rest_framework.reverse import reverse
from .vocabSerializer import TraductionSerializer


class TraductionSerializers(serializers.ModelSerializer):
    class Meta:
        model = Traduires
        fields= ('motTraduit',)


class LangueSerializers(serializers.ModelSerializer):
    urlDetails = serializers.HyperlinkedIdentityField(view_name="formation-detail", lookup_field = "pk")
    urlDell = serializers.HyperlinkedIdentityField(view_name="formation-dell", lookup_field = "pk")
    urlUpdate = serializers.HyperlinkedIdentityField(view_name="formation-update", lookup_field = "pk")
    tradLang = TraductionSerializer(source='id_Traduire',read_only=True, many=True)
    class Meta:
        model = Langue
        fields = ("id_langue","tradLang","libelleLangue","urlDetails", "urlDell","urlUpdate")

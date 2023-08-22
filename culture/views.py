from rest_framework.permissions import IsAuthenticated, AllowAny
from django.shortcuts import render
from .serializers import *
from .models import*
from rest_framework.response import Response
from rest_framework import generics, viewsets
from rest_framework.request import Request
from rest_framework.decorators import api_view

# Create your views here.

#affichage des champs sur l'api
class listLangue(viewsets.ModelViewSet):
    queryset = Langue.objects.all()
    serializer_class= LangueSerializer
    permission_classes= (IsAuthenticated,)
    filterset_fields= ['nomLangue']

class listConte(viewsets.ModelViewSet):
    queryset = Conte.objects.all()
    serializer_class= ConteSerializer
    filterset_fields= ['nomConte']

class listProverbe(viewsets.ModelViewSet):
    queryset = Proverbe.objects.all().order_by('theme')
    serializer_class= ProverbeSerializer
    filterset_fields= ['theme','traductionFrancais']

class listChant(viewsets.ModelViewSet):
    queryset = Chant.objects.all()
    serializer_class= ChantSerializer
    filterset_fields= ['nomChant']

#generer url d4un produit




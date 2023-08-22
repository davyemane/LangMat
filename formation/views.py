from rest_framework.response import Response
from rest_framework import status, viewsets
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework import permissions, authentication
from formation.vocabSerializer import ChampSerializer, NiveauSerializer, ContenuSerializer, MotFrSerializer, TraductionSerializer, ContenusSerializer,ChampsSerializer
from.serializer import*
from .models import *
from rest_framework import viewsets
from django_filters import rest_framework as filters


#afficher toute les langue
class ListLangue(generics.ListAPIView):
    queryset = Langue.objects.all()
    serializer_class= LangueSerializers

#afficher les details sur une langue
class DetailLangue(generics.RetrieveAPIView):
    queryset = Langue.objects.all()
    serializer_class= LangueSerializers

#supprimer une langue
class DellLangue(generics.RetrieveUpdateAPIView):
    queryset = Langue.objects.all()
    serializer_class= LangueSerializers

#ajouter une langue
class CreateLangue (generics.ListCreateAPIView):
    queryset= Langue.objects.all()
    serializer_class= LangueSerializers

#modifier une langue
class UpdateLangueView(generics.RetrieveUpdateAPIView):
    queryset = Langue.objects.all()
    serializer_class= LangueSerializers
    lookup_field = 'pk'







class ChampLexicaleViews(viewsets.ModelViewSet):
    queryset = ChampLexicale.objects.all().order_by('Nivform')
    serializer_class = ChampSerializer
    #authentication_classes= [authentication.SessionAuthentication]
    #permission_classes = [permissions.IsAuthenticated]



class ChampLexicaleList(generics.ListAPIView):
    queryset = ChampLexicale.objects.all()
    serializer_class = ChampsSerializer

class ChampLexicaleCreate(generics.CreateAPIView):
    queryset = ChampLexicale.objects.all()
    serializer_class = ChampsSerializer
    def perform_create(self, serializer):
        
        return super().perform_create(serializer)

class ChampLexicalDestroy(generics.RetrieveDestroyAPIView):
    queryset = ChampLexicale.objects.all().order_by('Nivform')
    serializer_class = ChampsSerializer

class ChampLexicaleDetail(generics.RetrieveAPIView):
    queryset = ChampLexicale.objects.all().order_by('Nivform')
    serializer_class = ChampsSerializer

class ChampUpdate(generics.RetrieveUpdateAPIView):
    queryset = ChampLexicale.objects.all().order_by('Nivform')
    serializer_class = ChampsSerializer







class ContenuDestroyviews(generics.RetrieveDestroyAPIView):
    queryset= Contenir.objects.all()
    serializer_class=ContenuSerializer
    lookup_field='pk'

class ContenuUpdateviews(generics.RetrieveUpdateAPIView):
    queryset= Contenir.objects.all()
    serializer_class=ContenusSerializer
    lookup_field='pk'


class ContenuListviews(generics.ListAPIView):
    queryset= Contenir.objects.all()
    serializer_class=ContenuSerializer
    
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_fields = ('NomChamp',)

    #authentication_classes= [authentication.SessionAuthentication,authentication.TokenAuthentication]
    #permission_classes = [permissions.IsAuthenticated]

class ContenuDetailViews(generics.RetrieveAPIView):
    queryset= Contenir.objects.all().order_by('NomChamp')
    serializer_class= ContenuSerializer
    lookup_field= 'pk'
    #authentication_classes= [authentication.SessionAuthentication,authentication.TokenAuthentication]
    #permission_classes = [permissions.IsAuthenticated]
class ContenuCreatViews(generics.ListCreateAPIView):
    queryset= Contenir.objects.all()
    serializer_class= ContenusSerializer
    #authentication_classes= [authentication.SessionAuthentication,authentication.TokenAuthentication]
    #permission_classes = [permissions.IsAuthenticated]






class Niveauviews(viewsets.ModelViewSet):
    queryset= NiveauFormation.objects.all()
    serializer_class=NiveauSerializer
    #authentication_classes= [authentication.SessionAuthentication,authentication.TokenAuthentication]
    #permission_classes = [permissions.IsAuthenticated]

class Motfrviews(viewsets.ModelViewSet):
    queryset= MotFr.objects.all()
    serializer_class=MotFrSerializer
    #authentication_classes= [authentication.SessionAuthentication,authentication.TokenAuthentication]
    #permission_classes = [permissions.IsAuthenticated]

 
class Traduireviews(viewsets.ModelViewSet):
    queryset= Traduires.objects.all()
    serializer_class=TraductionSerializer
    #authentication_classes= [authentication.SessionAuthentication,authentication.TokenAuthentication]
    #permission_classes = [permissions.IsAuthenticated]

class niveau(generics.ListCreateAPIView):
    queryset= NiveauFormation.objects.order_by('id_Niveau')
    serializer_class = NiveauSerializer
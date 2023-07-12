from django.shortcuts import render
from formation.vocabSerializer import *
from rest_framework import generics
from  formation.models import ChampLexicale
from rest_framework.response import Response
from . import client 

class SearchListView(generics.ListAPIView):
    def get(self, request, *args, **kwargs):
        query = request.GET.get('q')
        if not query:
            return Response("Aucun champ ne correspond", status=404)
        result = client.perform_search(query)
        return Response(result)


class SearcholdListView(generics.ListAPIView):
    queryset = ChampLexicale.objects.all()
    serializer_class= ChampSerializer

    #def get_queryset(self):
     #   qs= super().get_queryset()
      #  q = self.request.GET.get('q')
       # result = ChampLexicale.object.none()

        #if q is not None:
         #   user = None
          #  if self.request.user.is_authenticated():
           #     user = self.request.user
            #    result = qs.search(q, user)
        #return result
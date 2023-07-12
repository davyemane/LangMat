from algoliasearch_django import AlgoliaIndex
from algoliasearch_django.decorators import register

from formation.models import *

@register(ChampLexicale)
class ChampIndex(AlgoliaIndex):
    fields=[
        'NomChamp',
        'Nivform'
    ]

@register(Contenir)
class Contenu(AlgoliaIndex):
    fields=[
        'NomChamp',
        'id_Mot'
    ]

    settings ={
        'searchableAttributes':['NomChamp', 'id_Mot'],
    }
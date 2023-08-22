from django.urls import path, include
from .views import *
from rest_framework.routers import DefaultRouter
from . import views
#urls pour afficher la liste des tables de la bd

router = DefaultRouter()
router.register('langue', listLangue, basename='langue')
router.register('conte', listConte, basename='conte')
router.register('proverbe', listProverbe, basename='proverbe')
router.register('chant', listChant, basename='chant')

urlpatterns = [
    path('', include(router.urls)),
]

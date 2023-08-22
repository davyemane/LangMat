from django.urls import path,include
from .views import *

urlpatterns = [
    path('listerDialogue/', ListeDialogue.as_view()),
    path('ajouterDialogue/', AjoutDialogue.as_view()),
    path('detailsDialogue/<int:pk>/',DetailDialogue.as_view()),
    path('modifierDialogue/<int:pk>/',ModifDialogue.as_view()),
    path('supprimerDialogue/<int:pk>/',SupprimeDialogue.as_view()),
    path('listerNiveauFormation/', ListeNiveauFormation.as_view()),
    path('listerTheme/', ListeTheme.as_view()),
    path('detailsUtilisateur/<int:pk>/', DetailsUtilisateur.as_view()),
    path('detailsEnseignement/', DetailsEnseignement.as_view()),
    path('detailsNiveauFormation/<int:pk>/', DetailsNiveauFormation.as_view()),
    path('detailsLangue/<int:pk>/', DetailsLangue.as_view()),
    path('ajouterTest/', AjoutTest.as_view()),
] 
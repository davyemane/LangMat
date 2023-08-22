from django.urls import path,include
from .views import * 
from . import views 

from rest_framework.routers import DefaultRouter 
from rest_framework.authtoken.views import obtain_auth_token

router1 = DefaultRouter()
router1.register("Niveau",views.Niveauviews, basename='niveau')
router1.register("Champ",views.ChampLexicaleViews, basename='champ')
router1.register("Mots",views.Motfrviews, basename='champ')



urlpatterns = [
    path('langue/list/', ListLangue.as_view()),
    path('<int:pk>/langue/details', DetailLangue.as_view(), name= 'formation-detail'),
    path('langue/create/', CreateLangue.as_view()),
    path('<int:pk>/langue/delete/', DellLangue.as_view(), name='formation-dell'),
    path('<int:pk>/langue/update/', UpdateLangueView.as_view(), name='formation-update'),

    path('Niveau/',include(router1.urls)),
    path('nivList/', niveau.as_view()),



    path('champ/', ContenuListviews.as_view(), name="contenu_champ"),
    path('champ_create/', ChampLexicaleCreate.as_view()),
    path('champ_destroy/<int:pk>', ChampLexicalDestroy.as_view()),
    path('champ_Update/<int:pk>', ChampUpdate.as_view()),
    path('champ_Detail/<int:pk>', ChampLexicaleDetail.as_view()),
    path('champ_List/', ChampLexicaleList.as_view()),


    path('champ/create', ContenuCreatViews.as_view()),

    path('champ/detail/<int:pk>', ContenuDetailViews.as_view()),
    path('champ/update/<int:pk>', ContenuUpdateviews.as_view()),

    path('champ/destroy/<int:pk>', ContenuDestroyviews.as_view()),

    path('auth', obtain_auth_token),

 ]
 
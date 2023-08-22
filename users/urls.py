from django.urls import path, include
from . import views

urlpatterns= [
    path("", views.logins, name="login"),
    path("logout", views.logout_view),
    path("home", views.homeStud, name='homes'),
    path("signup", views.signup, name="signup"),
    path("account/", include("allauth.urls")),

]
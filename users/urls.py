from django.urls import path
from .views import RegisterViews, LoginView

urlpatterns = [
    path('register', RegisterViews.as_view()),
    path('login', LoginView.as_view())
]

"""FoodSearch URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from core.views import TestView,RecipesView,IngredientsView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('rest-auth/', include('rest_auth.urls')),
    path('auth/', include('djoser.urls')),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('', TestView.as_view(),name='test'),
    path('<str:username>', TestView.as_view(),name='test'),
    path('saved_recipes', RecipesView.as_view(),name='recipes'),
    path('saved_recipes/post', RecipesView.as_view(),name='recipes'),
    path('saved_recipes/<str:user_id>', RecipesView.as_view(),name='recipes'),
    path('saved_recipes/put/<str:id>', RecipesView.as_view(),name='recipes'),
    path('saved_recipes/del/<str:id>', RecipesView.as_view(),name='recipes'),
    path('saved_ingredients', IngredientsView.as_view(),name='ingredients'),
    path('saved_ingredients/<str:user_id>', IngredientsView.as_view(),name='ingredients'),
    path('saved_ingredients/del/<str:id>', IngredientsView.as_view(),name='ingredients'),
]

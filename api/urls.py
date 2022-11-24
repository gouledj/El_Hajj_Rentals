
from django.urls import path, include, re_path
from .views import main
from api import views

urlpatterns = [
    path('', main),
    re_path(r'^api/$', views.branches_list),
    re_path(r'^api/([0-9])$', views.branches_detail),
]

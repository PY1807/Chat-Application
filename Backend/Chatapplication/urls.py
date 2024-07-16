from django.contrib import admin
from django.urls import path,re_path
from django.views.generic import TemplateView
from . import views

urlpatterns=[
  # path('person/',views.PersonList.as_view()),
  path('',views.index,name="index"),
  path('person/',views.add,name="add"),
  path('log/',views.login),
  path('messages/<str:id>/',views.messages),
  path('newmessage/',views.newmessage),
  path('chatrooms/',views.chatrooms),
  path('addroom/',views.addroom),
  path('logout/',views.logout),
  path('delete/',views.deleteroom),
  re_path(r'^.*$', views.index, name="index"),
] 
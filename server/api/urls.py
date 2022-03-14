
from django.urls import path 
from . import views

urlpatterns = [
    path('', views.getRoutes , name="routes") ,
    path('set-csv' , views.setCSV , name="csv"),
    path('coins-data' , views.getCoinBaseAPI , name="coinbase"),
    path('analytics-data' , views.getAnalyticsInfo , name="analytics"),
]

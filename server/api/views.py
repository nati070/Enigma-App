
from os import stat
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializes import TimeSeriesSerializer
from rest_framework import status
from .models import TimeSeries
from .utils import fixTimeStrToDate , getPricesBTCinfo , getPricesETHinfo
import csv
from io import StringIO 
from datetime import datetime
import pytz
from django.db.models import Q

# Create your views here.

@api_view(['GET'])
def getRoutes(request):
    try:
        data_time_series = TimeSeries.objects.all()
    except:
        return Response(status= status.HTTP_404_NOT_FOUND)    
    serializer = TimeSeriesSerializer(data_time_series, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def setCSV(request):
    data_set = request.FILES['csvFile'].read().decode('UTF-8')
    io_string = StringIO(data_set)
    next(io_string)
    for row in csv.reader(io_string,delimiter=','):
            time_start = fixTimeStrToDate(row[0])
            time_end = fixTimeStrToDate(row[1])
            object = TimeSeries(time_peroid_start  = time_start ,time_peroid_end =  time_end , price_open = row[2] , price_high=row[3] , price_low=row[4] , price_close=row[5] , volume_traded=row[6] , trades_count = row[7]  )
            object.save()    
    
    return Response(status=status.HTTP_200_OK)

@api_view(['GET'])
def getCoinBaseAPI(request):
    btc_data  = getPricesBTCinfo()
    eth_data = getPricesETHinfo()
    return Response([btc_data , eth_data])

@api_view(['POST'])
def getAnalyticsInfo(request):
    data = request.data
    resData = TimeSeries.objects.filter(Q(time_peroid_start__gte =  data['time_start']) & Q(time_peroid_start__lte = data['time_end']))
    serializer = TimeSeriesSerializer(resData , many=True)
    return Response(serializer.data , status=status.HTTP_200_OK)
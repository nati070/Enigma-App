from dataclasses import field
from rest_framework import serializers
from .models import TimeSeries


class TimeSeriesSerializer(serializers.ModelSerializer):
    class Meta: 
        model = TimeSeries
        fields = '__all__'


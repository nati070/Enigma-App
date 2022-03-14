
from statistics import mode
from django.db import models
from datetime import datetime
import pytz
# Create your models here.

class TimeSeries(models.Model):
    time_peroid_start = models.DateTimeField()
    time_peroid_end = models.DateTimeField()
    price_open = models.DecimalField(decimal_places=2 , max_digits=255)
    price_high = models.DecimalField(decimal_places=2 , max_digits=255)
    price_low = models.DecimalField(decimal_places=2 , max_digits=255)
    price_close = models.DecimalField(decimal_places=2 , max_digits=255)
    volume_traded = models.DecimalField(max_digits=255 , decimal_places=5)
    trades_count = models.IntegerField()


    def __str__(self):
        return str(self.time_peroid_start) + " ," + str(self.time_peroid_end) + " , " + str(self.price_open)
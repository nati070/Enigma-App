
from datetime import datetime
from django.utils import timezone
import requests
import json

def fixTimeStrToDate(str):
   # t1 =  datetime.strptime(str[0:len(str)-2] , '%Y-%m-%dT%H:%M:%S.%f')
   t1 = datetime.fromisoformat(str[0:len(str)-9])
   current_tz = timezone.get_current_timezone()
   t2 = current_tz.localize(t1)
   return t2


def getPricesBTCinfo():
   buy = requests.get('https://api.coinbase.com/v2/prices/BTC-USD/buy')
   sell = requests.get('https://api.coinbase.com/v2/prices/BTC-USD/sell')
   spot = requests.get('https://api.coinbase.com/v2/prices/BTC-USD/spot')
   top_bid = json.loads(buy.text)["data"]["amount"]
   top_ask = json.loads(sell.text)["data"]["amount"]
   last_price = json.loads(spot.text)["data"]["amount"]
   return {"name" : "BTC-USD" , "bid" : top_bid, "ask": top_ask , "last" : last_price}

def getPricesETHinfo():
   buy = requests.get('https://api.coinbase.com/v2/prices/ETH-USD/buy')
   sell = requests.get('https://api.coinbase.com/v2/prices/ETH-USD/sell')
   spot = requests.get('https://api.coinbase.com/v2/prices/ETH-USD/spot')
   top_bid = json.loads(buy.text)["data"]["amount"]
   top_ask = json.loads(sell.text)["data"]["amount"]
   last_price = json.loads(spot.text)["data"]["amount"]
   return {"name" : "ETH-USD" , "bid" : top_bid, "ask": top_ask , "last" : last_price}
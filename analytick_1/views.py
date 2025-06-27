from django.shortcuts import render,redirect
from django.http import HttpResponse
from rest_framework import viewsets,routers,decorators
from rest_framework.response import Response
from .models import Stock, TradeEntry, JournalEntry, MarketInsight
from .serializers import StockSerializer, TradeEntrySerializer, JournalEntrySerializer, MarketInsightSerializer
from django.contrib import messages
from django.contrib.auth.models import User
from rest_framework import status
'''import pandas as pd
from fyers_apiv3 import fyersModel
import numpy as np
import datetime
import plotly.graph_objs as go
import plotly.offline as plotly
'''


class StockViewSet(viewsets.ModelViewSet):
    queryset = Stock.objects.all()
    serializer_class = StockSerializer

    def list(self, request, *args, **kwargs):
        serializer = self.get_serializer(self.queryset, many=True)
        return Response(serializer.data)
    @decorators.action(detail=False, methods=['post'])
    def add_stock(self,request):
        if request.method == "POST":
            id=request.POST.get('id')
            name=request.POST.get('name')
            sector=request.POST.get('sector')
        trade=Stock.objects.create(
            symbol=id,
            name=name,
            sector=sector
        )
        trade.save()
        messages.success(request, 'Stock added successfully!')
        return Response({'message': 'Stock added successfully!'})
    
        


class TradeEntryViewSet(viewsets.ModelViewSet):
    queryset = TradeEntry.objects.all()
    serializer_class = TradeEntrySerializer

    def list(self, request, *args, **kwargs):
        serializer = self.get_serializer(self.queryset, many=True)
        return Response(serializer.data)
    @decorators.action(detail=False, methods=['post'])
    def add_entry(self,request):
        if request.method=="POST":
            trade_type=request.POST.get('trade_type')
            price=request.POST.get('price')
            quantity=request.POST.get('quantity')
            date=request.POST.get('date')
            print(request.POST)
            try:
                user_instance = User.objects.get(username=request.POST.get('username'))
                user_id = user_instance.id
            except User.DoesNotExist:
                print("yo")  # Handle missing user gracefully
  # Check what data is being sent
        trade=TradeEntry.objects.create(
            user=None,
            stock=id,
            action=trade_type,
            price=price,
            quantity=quantity,
            date=date
        )
        trade.save()
        return Response({'message': 'Trade entry added successfully!'})


class JournalEntryViewSet(viewsets.ModelViewSet):
    queryset = JournalEntry.objects.all()
    serializer_class = JournalEntrySerializer

    def list(self, request, *args, **kwargs):
        serializer = self.get_serializer(self.queryset, many=True)
        return Response(serializer.data)

class MarketInsightViewSet(viewsets.ModelViewSet):
    queryset = MarketInsight.objects.all()
    serializer_class = MarketInsightSerializer

    def list(self, request, *args, **kwargs):
        serializer = self.get_serializer(self.queryset, many=True)
        return Response(serializer.data)

def main(request):
    return  render(request, 'test.html')
'''def stock_chart_view(request):
    rsi_graph = plot_rsi(dataf)
    candlestick_graph = plot_candlestick(dataf)
    
    return render(request, "chart.html", {"rsi_graph": rsi_graph, "candlestick_graph": candlestick_graph})
'''


'''period=14
client_id1="R631IJ3VHJ-100"
secret_id1="9LROJOVBKY"
response_type1="code"
grant_type = "authorization_code"
redirect_url1="https://webhook.site/5f49acf8-3b9d-4a90-8839-1e24aa4e4e12"
data = {
    "symbol": "NSE:RVNL-EQ",
    "resolution": 'D',
    "date_format": 1,
    "range_from": "2024-01-01",
    "range_to": "2024-12-01",
    "cont_flag": 1
}
Access_token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsiZDoxIiwiZDoyIiwieDowIiwieDoxIiwieDoyIl0sImF0X2hhc2giOiJnQUFBQUFCb0JNbDA2dVJHWW5ObFBkaUJuTklJTVA1dG9TRHZZXzlpcEhiOUppNURZa05GcUZlZjU4UnIwY1VodWVuUUozeWdvNWZfanFlcl9Ta194UGh5S21zekFyaVNINXFJQWZ2bGo4UkstX28xbVdoeENHRT0iLCJkaXNwbGF5X25hbWUiOiIiLCJvbXMiOiJLMSIsImhzbV9rZXkiOiIyZGE0ZTVkMzM1OGJhYTEzODhkODMzMWEzYzllYTg1YjIxYTljOTdhMGI4MzMzOGJlM2MwMmMyMCIsImlzRGRwaUVuYWJsZWQiOiJOIiwiaXNNdGZFbmFibGVkIjoiTiIsImZ5X2lkIjoiRkFBMDc3NjYiLCJhcHBUeXBlIjoxMDAsImV4cCI6MTc0NTE5NTQwMCwiaWF0IjoxNzQ1MTQ0MTgwLCJpc3MiOiJhcGkuZnllcnMuaW4iLCJuYmYiOjE3NDUxNDQxODAsInN1YiI6ImFjY2Vzc190b2tlbiJ9.O2JEKN_0N-d0ZZt6lqtWMaj5MxTdOY-zKOkx-_Zi2L4"

fyers=fyersModel.FyersModel(log_path="",client_id=client_id1,token=Access_token,is_async=False)
stock_data = fyers.history(data=data)
candles = stock_data['candles']
dataf = pd.DataFrame(candles, columns=['timestamp', 'Open Value', 'High Value', 'Low Value', 'close value', 'Volume'])
def calc_rsi(dataf, period=14):
    delta = dataf['close value'].diff()
    gain = delta.where(delta > 0, 0)
    loss = -delta.where(delta > 0, 0)
    avg_gain = gain.rolling(window=period).mean()
    avg_loss = loss.rolling(window=period).mean()
    rs = avg_gain / avg_loss
    rsi = 100 - (100 / (1 + rs))
    return rsi
dataf['RSI'] = calc_rsi(dataf)


# Create RSI Plot
def plot_rsi(df):
    df['formatted_date'] = df['timestamp'].apply(lambda x: datetime.datetime.fromtimestamp(x).strftime('%Y-%m-%d'))
    
    fig = go.Figure()
    fig.add_trace(go.Scatter(x=df['formatted_date'], y=df['RSI'], mode='lines', name='RSI', line=dict(color='blue')))
    fig.add_trace(go.Scatter(x=df['formatted_date'], y=[70] * len(df), mode='lines', name='Overbought (70)', line=dict(color='red', dash='dash')))
    fig.add_trace(go.Scatter(x=df['formatted_date'], y=[30] * len(df), mode='lines', name='Oversold (30)', line=dict(color='green', dash='dash')))
    
    fig.update_layout(title="Relative Strength Index (RSI)", xaxis_title="Date", yaxis_title="RSI Value", template="plotly_white")
    return plotly.plot(fig, output_type='div')

# Create Candlestick Plot
def plot_candlestick(df):
    dates = [datetime.datetime.fromtimestamp(candle[0]).strftime('%Y-%m-%d') for candle in stock_data['candles']]
    
    fig = go.Figure(data=[go.Candlestick(
        x=dates,
        open=[candle[1] for candle in stock_data['candles']],
        high=[candle[2] for candle in stock_data['candles']],
        low=[candle[3] for candle in stock_data['candles']],
        close=[candle[4] for candle in stock_data['candles']]
    )])
    
    fig.update_layout(title=f"Candlestick Chart for {data['symbol']}", xaxis_title="Date", yaxis_title="Price", xaxis_rangeslider_visible=False)
    return plotly.plot(fig, output_type='div')
def stock_chart_view(request):
    rsi_graph = plot_rsi(dataf)
    candlestick_graph = plot_candlestick(dataf)
    
    return render(request, "chart.html", {"rsi_graph": rsi_graph, "candlestick_graph": candlestick_graph})
'''

class ChartView(viewsets.ViewSet):
    def retrieve(self, request, pk=None):
        symbol = pk or "COINBASE:BTCUSD"
        interval = request.query_params.get('interval', '1D')
        theme = request.query_params.get('theme', 'light')
        
        valid_intervals = ['1', '5', '15', '30', '1H', '4H', '1D', '1W', '1M']
        valid_themes = ['light', 'dark']
        if interval not in valid_intervals:
            interval = '1D'
        if theme not in valid_themes:
            theme = 'light'

        config = {
            "symbol": symbol,
            "interval": interval,
            "theme": theme,
            "timezone": "Etc/UTC",
            "style": "1",
            "locale": "en",
            "enable_publishing": False,
            "allow_symbol_change": True
        }
        return Response(config, status=status.HTTP_200_OK)
from django.db import models
from django.contrib.auth.models import User

class Stock(models.Model):
    symbol = models.CharField(max_length=10, unique=True)
    name = models.CharField(max_length=255)
    sector = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return self.symbol

class TradeEntry(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    stock = models.ForeignKey(Stock, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)
    action = models.CharField(max_length=10, choices=[('BUY', 'Buy'), ('SELL', 'Sell')])
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.IntegerField()
    notes = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.user.username} - {self.stock.symbol} - {self.action}"

class JournalEntry(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)
    stock = models.ForeignKey(Stock, on_delete=models.SET_NULL, null=True, blank=True)
    thoughts = models.TextField()
    market_sentiment = models.CharField(max_length=50, choices=[
        ('Bullish', 'Bullish'),
        ('Bearish', 'Bearish'),
        ('Neutral', 'Neutral')
    ], blank=True, null=True)

    def __str__(self):
        return f"Journal Entry on {self.date} by {self.user.username}"

class MarketInsight(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=255)
    content = models.TextField()

    def __str__(self):
        return f"Market Insight: {self.title}"
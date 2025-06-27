from rest_framework import serializers
from .models import Stock,TradeEntry,JournalEntry,MarketInsight
class StockSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stock
        fields = '__all__'
class TradeEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = TradeEntry
        fields = '__all__'
class JournalEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = JournalEntry
        fields = '__all__'
class MarketInsightSerializer(serializers.ModelSerializer):
    class Meta:
        model = MarketInsight
        fields = '__all__'

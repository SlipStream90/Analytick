from django.urls import path,include
from rest_framework.routers import DefaultRouter
from . import views
from .views import StockViewSet, TradeEntryViewSet, JournalEntryViewSet, MarketInsightViewSet,ChartView#stock_chart_view

router = DefaultRouter()
router.register(r'stocks', StockViewSet)
router.register(r'trade-entries', TradeEntryViewSet)
router.register(r'journal-entries', JournalEntryViewSet)
router.register(r'market-insights', MarketInsightViewSet)
router.register(r'chart-config', ChartView, basename='chart-config')
urlpatterns = [
    path("", views.main, name="main"),
    path('api/', include(router.urls)),
    #path('chart/', stock_chart_view, name='stock_chart_view')
]
import React from 'react';
import { Box, Container, Typography, Divider } from '@mui/material';

function Blog() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flex: 1 }}>
        <Typography variant="h4" color="primary" gutterBottom sx={{ fontWeight: 600 }}>
          Beginner Trading Strategies
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom sx={{ mb: 4 }}>
          A guide to essential trading strategies for beginners looking to navigate the financial markets.
        </Typography>

        <Divider sx={{ mb: 4 }} />

        <Typography variant="h5" color="text.primary" gutterBottom sx={{ fontWeight: 500 }}>
          1. Trend Following: Riding the Market Wave
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Trend following is all about identifying the direction of the market and sticking with it. Traders look for higher highs and higher lows in an uptrend or the opposite in a downtrend. Tools like the 50-day and 200-day moving averages help confirm the trend. The key? Patience. You’re not trying to predict reversals—you’re surfing the wave until it breaks.
        </Typography>

        <Typography variant="h5" color="text.primary" gutterBottom sx={{ fontWeight: 500, mt: 4 }}>
          2. Swing Trading: Catching the Short-Term Swings
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Swing traders aim to capture price moves over a few days to weeks. They rely on technical indicators like RSI and MACD to spot overbought or oversold conditions. It’s a strategy that balances time commitment and opportunity—perfect for those who can’t monitor charts all day but still want to stay active.
        </Typography>

        <Typography variant="h5" color="text.primary" gutterBottom sx={{ fontWeight: 500, mt: 4 }}>
          3. Breakout Trading: When Price Escapes the Cage
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Breakout traders wait for price to break through key support or resistance levels. The idea is to catch the momentum as it escapes a consolidation zone. Volume confirmation is crucial—without it, breakouts can turn into fakeouts. Think of it as catching a rocket just as it lifts off.
        </Typography>

        <Typography variant="h5" color="text.primary" gutterBottom sx={{ fontWeight: 500, mt: 4 }}>
          4. Mean Reversion: Betting on the Bounce
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          This strategy assumes that prices will revert to their average over time. When a stock strays too far from its mean, it’s expected to snap back. Bollinger Bands and RSI are popular tools here. It’s like a rubber band—stretch it too far, and it’s bound to snap back.
        </Typography>

        <Typography variant="h5" color="text.primary" gutterBottom sx={{ fontWeight: 500, mt: 4 }}>
          5. Day Trading: The Art of the Intraday Hustle
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Day traders open and close positions within the same day, avoiding overnight risk. They thrive on volatility and volume, using tools like VWAP and candlestick patterns. It’s fast-paced, high-risk, and not for the faint of heart—but for some, it’s the ultimate adrenaline rush.
        </Typography>

        <Typography variant="h5" color="text.primary" gutterBottom sx={{ fontWeight: 500, mt: 4 }}>
          6. Risk Management: The Unsung Hero
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          No strategy works without solid risk management. This includes setting stop-losses, calculating position sizes, and maintaining a favorable risk-reward ratio (like 1:2). It’s not just about making money—it’s about keeping it.
        </Typography>

        <Divider sx={{ mt: 4 }} />
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2, textAlign: 'center' }}>
          © 2025 AnalyTick. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}

export default Blog;
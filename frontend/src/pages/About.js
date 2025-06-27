import React from 'react';
import { Box, Container, Typography } from '@mui/material';

function About() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flex: 1 }}>
        <Typography variant="h4" color="primary" gutterBottom>
          About AnalyTick
        </Typography>
        <Typography variant="body1" color="text.secondary">
          AnalyTick is a comprehensive stock market dashboard providing real-time data, charts, and insights for investors and traders.
        </Typography>
      </Container>
    </Box>
  );
}

export default About;
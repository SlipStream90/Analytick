import React from 'react';
import { Box, Container, Typography } from '@mui/material';

function Contact() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flex: 1 }}>
        <Typography variant="h4" color="primary" gutterBottom>
          Contact Us
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Reach out to us at support@analytick.com for any inquiries or support.
        </Typography>
      </Container>
    </Box>
  );
}

export default Contact;
import React from 'react';
import { Box, CircularProgress, Typography, Paper } from '@mui/material';
import { Phone } from '@mui/icons-material';

function LoadingScreen() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        bgcolor: 'background.default'
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          textAlign: 'center',
          borderRadius: 2,
          maxWidth: 400
        }}
      >
        <Phone
          color="primary"
          sx={{ fontSize: 64, mb: 2 }}
        />
        
        <Typography variant="h4" component="h1" gutterBottom color="primary">
          📱 Registro Móvil
        </Typography>
        
        <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
          Cargando sistema...
        </Typography>
        
        <CircularProgress size={40} />
        
        <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
          Verificando licencia y cargando datos
        </Typography>
      </Paper>
    </Box>
  );
}

export default LoadingScreen;

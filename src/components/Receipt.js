import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow
} from '@mui/material';
import { Print, Download } from '@mui/icons-material';

function Receipt({ equipment, onClose }) {
  const formatDate = (dateString) => {
    if (!dateString) return new Date().toLocaleDateString('es-CO');
    const date = new Date(dateString);
    return date.toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatPrice = (price) => {
    if (!price) return '$0';
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handlePrint = () => {
    const printContent = document.getElementById('receipt-content');
    const originalContents = document.body.innerHTML;
    
    document.body.innerHTML = printContent.innerHTML;
    window.print();
    document.body.innerHTML = originalContents;
    
    // Re-renderizar React después de la impresión
    window.location.reload();
  };

  const handleDownload = () => {
    const printContent = document.getElementById('receipt-content');
    const printWindow = window.open('', '_blank');
    
    printWindow.document.write(`
      <html>
        <head>
          <title>Recibo de Compra - ${equipment.brand} ${equipment.model}</title>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              margin: 20px; 
              font-size: 12px;
            }
            .header { 
              text-align: center; 
              border-bottom: 2px solid #000; 
              padding-bottom: 10px; 
              margin-bottom: 20px;
            }
            .company-name { 
              font-size: 24px; 
              font-weight: bold; 
              margin-bottom: 5px;
            }
            .receipt-title { 
              font-size: 18px; 
              margin-bottom: 5px;
            }
            .info-section { 
              margin-bottom: 20px;
            }
            .info-row { 
              display: flex; 
              justify-content: space-between; 
              margin-bottom: 5px;
            }
            .label { 
              font-weight: bold; 
              min-width: 120px;
            }
            .value { 
              text-align: right;
            }
            .equipment-details { 
              border: 1px solid #000; 
              padding: 15px; 
              margin: 20px 0;
            }
            .footer { 
              text-align: center; 
              margin-top: 30px; 
              border-top: 1px solid #000; 
              padding-top: 10px;
            }
            @media print {
              body { margin: 0; }
              .no-print { display: none; }
            }
          </style>
        </head>
        <body>
          ${printContent.innerHTML}
        </body>
      </html>
    `);
    
    printWindow.document.close();
  };

  if (!equipment) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h6" color="error">
          No hay información del equipo para generar el recibo
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
        {/* Botones de acción */}
        <Box sx={{ mb: 3, display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Button
            variant="contained"
            startIcon={<Print />}
            onClick={handlePrint}
            color="primary"
            size="large"
          >
            Imprimir Recibo
          </Button>
          <Button
            variant="outlined"
            startIcon={<Download />}
            onClick={handleDownload}
            color="secondary"
            size="large"
          >
            Descargar PDF
          </Button>
        </Box>

        {/* Contenido del recibo */}
        <Box id="receipt-content">
          {/* Encabezado */}
          <Box className="header">
            <Typography variant="h4" className="company-name">
              📱 REGISTRO MÓVIL
            </Typography>
            <Typography variant="h6" className="receipt-title">
              RECIBO DE COMPRA
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Sistema de Gestión de Equipos Móviles
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Información de la transacción */}
          <Box className="info-section">
            <Typography variant="h6" gutterBottom>
              Información de la Transacción
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body2">
                  <strong>Número de Recibo:</strong> #{equipment.id || '001'}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">
                  <strong>Fecha:</strong> {formatDate(equipment.purchaseDate)}
                </Typography>
              </Grid>
            </Grid>
          </Box>

          {/* Detalles del equipo */}
          <Box className="equipment-details">
            <Typography variant="h6" gutterBottom align="center">
              EQUIPO COMPRADO
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>IMEI:</TableCell>
                    <TableCell sx={{ fontFamily: 'monospace', fontSize: '14px' }}>
                      {equipment.imei}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Marca:</TableCell>
                    <TableCell>{equipment.brand}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Modelo:</TableCell>
                    <TableCell>{equipment.model}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Precio de Compra:</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: 'success.main' }}>
                      {formatPrice(equipment.purchasePrice)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          {/* Información del vendedor */}
          <Box className="info-section">
            <Typography variant="h6" gutterBottom>
              Información del Vendedor
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body2">
                  <strong>Nombre:</strong> {equipment.sellerName}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">
                  <strong>Teléfono:</strong> {equipment.sellerPhone}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">
                  <strong>Documento:</strong> {equipment.sellerDocument}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">
                  <strong>Email:</strong> {equipment.sellerEmail || 'No especificado'}
                </Typography>
              </Grid>
            </Grid>
          </Box>

          {/* Términos y condiciones */}
          <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
            <Typography variant="body2" color="textSecondary" align="center">
              <strong>Términos y Condiciones:</strong>
            </Typography>
            <Typography variant="caption" color="textSecondary" display="block" sx={{ mt: 1 }}>
              • Este recibo confirma la compra del equipo móvil especificado
            </Typography>
            <Typography variant="caption" color="textSecondary" display="block">
              • El IMEI registrado es único e irrepetible
            </Typography>
            <Typography variant="caption" color="textSecondary" display="block">
              • Se recomienda conservar este documento para futuras referencias
            </Typography>
          </Box>

          {/* Pie de página */}
          <Box className="footer">
            <Typography variant="body2" color="textSecondary">
              Recibo generado el {formatDate()}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              Sistema de Gestión de Equipos Móviles - Registro Móvil
            </Typography>
          </Box>
        </Box>

        {/* Botón de cerrar */}
        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Button
            variant="outlined"
            onClick={onClose}
            color="primary"
          >
            Cerrar
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default Receipt;

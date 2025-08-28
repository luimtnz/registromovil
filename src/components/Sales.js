import React, { useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Grid,
  IconButton,
  Tooltip,
  Card,
  CardContent,
  Button
} from '@mui/material';
import { Edit, Visibility, Phone, TrendingUp, Add } from '@mui/icons-material';

function Sales() {
  // Datos de ejemplo - en una aplicación real vendrían de una API
  const [sales] = useState([
    {
      id: 1,
      imei: '123456789012345',
      brand: 'Samsung',
      model: 'Galaxy S21',
      clientName: 'Juan Pérez',
      clientPhone: '3001234567',
      clientEmail: 'juan@email.com',
      distributorName: '',
      salePrice: '1200000',
      saleDate: '2024-01-25',
      status: 'vendido'
    },
    {
      id: 2,
      imei: '555666777888999',
      brand: 'Xiaomi',
      model: 'Redmi Note 10',
      clientName: 'Distribuidor ABC',
      clientPhone: '',
      clientEmail: '',
      distributorName: 'Distribuidor ABC',
      salePrice: '800000',
      saleDate: '2024-01-18',
      status: 'en_inventario'
    },
    {
      id: 3,
      imei: '999888777666555',
      brand: 'iPhone',
      model: '12 Mini',
      clientName: 'María González',
      clientPhone: '3009876543',
      clientEmail: 'maria@email.com',
      distributorName: '',
      salePrice: '1500000',
      saleDate: '2024-01-20',
      status: 'vendido'
    }
  ]);

  const [filterStatus, setFilterStatus] = useState('todos');
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusColor = (status) => {
    switch (status) {
      case 'vendido': return 'success';
      case 'en_inventario': return 'default';
      case 'reservado': return 'warning';
      default: return 'default';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'vendido': return 'Vendido';
      case 'en_inventario': return 'En Inventario';
      case 'reservado': return 'Reservado';
      default: return status;
    }
  };

  const formatPrice = (price) => {
    if (!price) return '$0';
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  };

  const filteredSales = sales.filter(item => {
    const matchesStatus = filterStatus === 'todos' || item.status === filterStatus;
    const matchesSearch = 
      item.imei.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.distributorName && item.distributorName.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesStatus && matchesSearch;
  });

  const totalSales = sales.filter(item => item.status === 'vendido').length;
  const totalRevenue = sales
    .filter(item => item.status === 'vendido')
    .reduce((sum, item) => sum + parseInt(item.salePrice || 0), 0);
  const inInventory = sales.filter(item => item.status === 'en_inventario').length;

  return (
    <Container maxWidth="xl">
      <Paper elevation={3} sx={{ p: 4, mt: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1">
            📱 Gestión de Ventas
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            color="primary"
            size="large"
          >
            Nueva Venta
          </Button>
        </Box>

        {/* Estadísticas */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <TrendingUp color="success" sx={{ fontSize: 40, mr: 2 }} />
                  <Box>
                    <Typography variant="h4" component="div">
                      {totalSales}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Ventas Realizadas
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Phone color="primary" sx={{ fontSize: 40, mr: 2 }} />
                  <Box>
                    <Typography variant="h4" component="div">
                      {inInventory}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      En Inventario
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <TrendingUp color="info" sx={{ fontSize: 40, mr: 2 }} />
                  <Box>
                    <Typography variant="h4" component="div">
                      {formatPrice(totalRevenue)}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Ingresos Totales
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <TrendingUp color="warning" sx={{ fontSize: 40, mr: 2 }} />
                  <Box>
                    <Typography variant="h4" component="div">
                      {totalSales > 0 ? formatPrice(Math.round(totalRevenue / totalSales)) : '$0'}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Promedio por Venta
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Filtros */}
        <Box sx={{ mb: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Estado</InputLabel>
                <Select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  label="Estado"
                >
                  <MenuItem value="todos">Todos</MenuItem>
                  <MenuItem value="vendido">Vendido</MenuItem>
                  <MenuItem value="en_inventario">En Inventario</MenuItem>
                  <MenuItem value="reservado">Reservado</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                label="Buscar por IMEI, marca, modelo, cliente o distribuidor"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar..."
              />
            </Grid>
          </Grid>
        </Box>

        {/* Tabla de ventas */}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>IMEI</TableCell>
                <TableCell>Equipo</TableCell>
                <TableCell>Cliente/Distribuidor</TableCell>
                <TableCell>Precio de Venta</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Fecha</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredSales.map((item) => (
                <TableRow key={item.id} hover>
                  <TableCell>
                    <Typography variant="body2" fontFamily="monospace">
                      {item.imei}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant="body1" fontWeight="bold">
                        {item.brand} {item.model}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {item.distributorName ? (
                      <Typography variant="body2" color="primary">
                        {item.distributorName}
                      </Typography>
                    ) : (
                      <Box>
                        <Typography variant="body2">{item.clientName}</Typography>
                        <Typography variant="caption" color="textSecondary">
                          {item.clientPhone}
                        </Typography>
                        {item.clientEmail && (
                          <Typography variant="caption" display="block" color="textSecondary">
                            {item.clientEmail}
                          </Typography>
                        )}
                      </Box>
                    )}
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight="bold" color="success.main">
                      {formatPrice(item.salePrice)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={getStatusText(item.status)}
                      color={getStatusColor(item.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{item.saleDate}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Tooltip title="Ver detalles">
                        <IconButton size="small" color="primary">
                          <Visibility />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Editar">
                        <IconButton size="small" color="secondary">
                          <Edit />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Resumen */}
        <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
          <Typography variant="h6" gutterBottom>
            Resumen de Ventas
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6} md={3}>
              <Typography variant="body2" color="textSecondary">
                Total de Ventas: {sales.length}
              </Typography>
            </Grid>
            <Grid item xs={6} md={3}>
              <Typography variant="body2" color="textSecondary">
                Vendidos: {totalSales}
              </Typography>
            </Grid>
            <Grid item xs={6} md={3}>
              <Typography variant="body2" color="textSecondary">
                En Inventario: {inInventory}
              </Typography>
            </Grid>
            <Grid item xs={6} md={3}>
              <Typography variant="body2" color="textSecondary">
                Ingresos: {formatPrice(totalRevenue)}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}

export default Sales;

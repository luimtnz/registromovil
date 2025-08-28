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
import { Edit, Visibility, ShoppingCart, TrendingDown, Add } from '@mui/icons-material';

function Purchases() {
  // Datos de ejemplo - en una aplicación real vendrían de una API
  const [purchases] = useState([
    {
      id: 1,
      imei: '111222333444555',
      brand: 'Huawei',
      model: 'P30 Lite',
      sellerName: 'María González',
      sellerPhone: '3009876543',
      sellerEmail: 'maria@email.com',
      sellerDocument: '12345678',
      purchasePrice: '450000',
      purchaseDate: '2024-01-22',
      status: 'en_inventario'
    },
    {
      id: 2,
      imei: '999888777666555',
      brand: 'Motorola',
      model: 'G Power',
      sellerName: 'Carlos Rodríguez',
      sellerPhone: '3005554444',
      sellerEmail: 'carlos@email.com',
      sellerDocument: '87654321',
      purchasePrice: '320000',
      purchaseDate: '2024-01-23',
      status: 'en_inventario'
    },
    {
      id: 3,
      imei: '777666555444333',
      brand: 'Samsung',
      model: 'Galaxy A52',
      sellerName: 'Ana López',
      sellerPhone: '3001112222',
      sellerEmail: 'ana@email.com',
      sellerDocument: '11223344',
      purchasePrice: '550000',
      purchaseDate: '2024-01-24',
      status: 'en_inventario'
    }
  ]);

  const [filterStatus, setFilterStatus] = useState('todos');
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusColor = (status) => {
    switch (status) {
      case 'en_inventario': return 'default';
      case 'vendido': return 'success';
      case 'en_reparacion': return 'warning';
      default: return 'default';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'en_inventario': return 'En Inventario';
      case 'vendido': return 'Vendido';
      case 'en_reparacion': return 'En Reparación';
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

  const filteredPurchases = purchases.filter(item => {
    const matchesStatus = filterStatus === 'todos' || item.status === filterStatus;
    const matchesSearch = 
      item.imei.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sellerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sellerDocument.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });

  const totalPurchases = purchases.length;
  const totalSpent = purchases.reduce((sum, item) => sum + parseInt(item.purchasePrice || 0), 0);
  const inInventory = purchases.filter(item => item.status === 'en_inventario').length;
  const averagePrice = totalPurchases > 0 ? Math.round(totalSpent / totalPurchases) : 0;

  return (
    <Container maxWidth="xl">
      <Paper elevation={3} sx={{ p: 4, mt: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1">
            🛒 Gestión de Compras
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            color="success"
            size="large"
          >
            Nueva Compra
          </Button>
        </Box>

        {/* Estadísticas */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <ShoppingCart color="success" sx={{ fontSize: 40, mr: 2 }} />
                  <Box>
                    <Typography variant="h4" component="div">
                      {totalPurchases}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Compras Realizadas
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
                  <ShoppingCart color="primary" sx={{ fontSize: 40, mr: 2 }} />
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
                  <TrendingDown color="error" sx={{ fontSize: 40, mr: 2 }} />
                  <Box>
                    <Typography variant="h4" component="div">
                      {formatPrice(totalSpent)}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Total Gastado
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
                  <TrendingDown color="warning" sx={{ fontSize: 40, mr: 2 }} />
                  <Box>
                    <Typography variant="h4" component="div">
                      {formatPrice(averagePrice)}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Precio Promedio
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
                  <MenuItem value="en_inventario">En Inventario</MenuItem>
                  <MenuItem value="vendido">Vendido</MenuItem>
                  <MenuItem value="en_reparacion">En Reparación</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                label="Buscar por IMEI, marca, modelo, vendedor o documento"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar..."
              />
            </Grid>
          </Grid>
        </Box>

        {/* Tabla de compras */}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>IMEI</TableCell>
                <TableCell>Equipo</TableCell>
                <TableCell>Vendedor</TableCell>
                <TableCell>Precio de Compra</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Fecha</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredPurchases.map((item) => (
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
                    <Box>
                      <Typography variant="body2">{item.sellerName}</Typography>
                      <Typography variant="caption" color="textSecondary">
                        {item.sellerPhone}
                      </Typography>
                      <Typography variant="caption" display="block" color="textSecondary">
                        Doc: {item.sellerDocument}
                      </Typography>
                      {item.sellerEmail && (
                        <Typography variant="caption" display="block" color="textSecondary">
                          {item.sellerEmail}
                        </Typography>
                      )}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight="bold" color="error.main">
                      {formatPrice(item.purchasePrice)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={getStatusText(item.status)}
                      color={getStatusColor(item.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{item.purchaseDate}</TableCell>
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
            Resumen de Compras
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6} md={3}>
              <Typography variant="body2" color="textSecondary">
                Total de Compras: {purchases.length}
              </Typography>
            </Grid>
            <Grid item xs={6} md={3}>
              <Typography variant="body2" color="textSecondary">
                En Inventario: {inInventory}
              </Typography>
            </Grid>
            <Grid item xs={6} md={3}>
              <Typography variant="body2" color="textSecondary">
                Total Gastado: {formatPrice(totalSpent)}
              </Typography>
            </Grid>
            <Grid item xs={6} md={3}>
              <Typography variant="body2" color="textSecondary">
                Precio Promedio: {formatPrice(averagePrice)}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}

export default Purchases;

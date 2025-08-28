import React, { useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Box,
  Grid,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Divider,
  TextField,
  InputAdornment
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  ShoppingCart,
  Phone,
  Build,
  PictureAsPdf,
  TableChart,
  BarChart,
  PieChart,
  Search
} from '@mui/icons-material';

function Reports() {
  const [reportType, setReportType] = useState('ventas');
  const [dateRange, setDateRange] = useState('mes');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Datos de ejemplo para reportes
  const salesData = [
    { month: 'Enero', ventas: 12, ingresos: 15000000, compras: 8, gastos: 8000000 },
    { month: 'Febrero', ventas: 15, ingresos: 18000000, compras: 10, gastos: 10000000 },
    { month: 'Marzo', ventas: 18, ingresos: 22000000, compras: 12, gastos: 12000000 },
    { month: 'Abril', ventas: 14, ingresos: 17000000, compras: 9, gastos: 9000000 },
    { month: 'Mayo', ventas: 20, ingresos: 25000000, compras: 15, gastos: 15000000 },
    { month: 'Junio', ventas: 16, ingresos: 20000000, compras: 11, gastos: 11000000 }
  ];

  const topProducts = [
    { brand: 'Samsung', model: 'Galaxy S21', ventas: 25, ingresos: 30000000 },
    { brand: 'iPhone', model: '13 Pro', ventas: 20, ingresos: 28000000 },
    { brand: 'Xiaomi', model: 'Redmi Note 10', ventas: 18, ingresos: 15000000 },
    { brand: 'Huawei', model: 'P30 Lite', ventas: 15, ingresos: 12000000 },
    { brand: 'Motorola', model: 'G Power', ventas: 12, ingresos: 8000000 }
  ];

  const repairStats = [
    { status: 'En Reparación', count: 8, percentage: 32 },
    { status: 'Pendiente', count: 5, percentage: 20 },
    { status: 'Entregado', count: 12, percentage: 48 }
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  };

  const calculateTotals = () => {
    const totalVentas = salesData.reduce((sum, item) => sum + item.ventas, 0);
    const totalIngresos = salesData.reduce((sum, item) => sum + item.ingresos, 0);
    const totalCompras = salesData.reduce((sum, item) => sum + item.compras, 0);
    const totalGastos = salesData.reduce((sum, item) => sum + item.gastos, 0);
    const ganancia = totalIngresos - totalGastos;

    return { totalVentas, totalIngresos, totalCompras, totalGastos, ganancia };
  };

  const totals = calculateTotals();

  const handleExportExcel = () => {
    // Simular exportación a Excel
    console.log('Exportando a Excel:', { reportType, dateRange, startDate, endDate });
    alert('Exportación a Excel iniciada...');
  };

  const handleExportPDF = () => {
    // Simular exportación a PDF
    console.log('Exportando a PDF:', { reportType, dateRange, startDate, endDate });
    alert('Exportación a PDF iniciada...');
  };

  const getReportTitle = () => {
    switch (reportType) {
      case 'ventas': return '📊 Reporte de Ventas';
      case 'compras': return '🛒 Reporte de Compras';
      case 'reparaciones': return '🔧 Reporte de Reparaciones';
      case 'inventario': return '📱 Reporte de Inventario';
      default: return '📊 Reportes Generales';
    }
  };

  const getReportIcon = () => {
    switch (reportType) {
      case 'ventas': return <TrendingUp color="success" />;
      case 'compras': return <ShoppingCart color="primary" />;
      case 'reparaciones': return <Build color="warning" />;
      case 'inventario': return <Phone color="info" />;
      default: return <BarChart color="action" />;
    }
  };

  return (
    <Container maxWidth="xl">
      <Paper elevation={3} sx={{ p: 4, mt: 3 }}>
        {/* Header del Reporte */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          {getReportIcon()}
          <Typography variant="h4" component="h1" sx={{ ml: 2 }}>
            {getReportTitle()}
          </Typography>
        </Box>

        {/* Filtros del Reporte */}
        <Paper elevation={1} sx={{ p: 3, mb: 3, bgcolor: 'grey.50' }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Tipo de Reporte</InputLabel>
                <Select
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                  label="Tipo de Reporte"
                >
                  <MenuItem value="ventas">Ventas</MenuItem>
                  <MenuItem value="compras">Compras</MenuItem>
                  <MenuItem value="reparaciones">Reparaciones</MenuItem>
                  <MenuItem value="inventario">Inventario</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Rango de Fechas</InputLabel>
                <Select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  label="Rango de Fechas"
                >
                  <MenuItem value="hoy">Hoy</MenuItem>
                  <MenuItem value="semana">Esta Semana</MenuItem>
                  <MenuItem value="mes">Este Mes</MenuItem>
                  <MenuItem value="trimestre">Este Trimestre</MenuItem>
                  <MenuItem value="año">Este Año</MenuItem>
                  <MenuItem value="personalizado">Personalizado</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {dateRange === 'personalizado' && (
              <>
                <Grid item xs={12} md={2}>
                  <TextField
                    fullWidth
                    label="Fecha Inicio"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} md={2}>
                  <TextField
                    fullWidth
                    label="Fecha Fin"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              </>
            )}

            <Grid item xs={12} md={2}>
              <TextField
                fullWidth
                label="Buscar"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
                placeholder="Buscar en reporte..."
              />
            </Grid>

            <Grid item xs={12} md={2}>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  variant="contained"
                  startIcon={<TableChart />}
                  onClick={handleExportExcel}
                  color="success"
                  fullWidth
                >
                  Excel
                </Button>
                <Button
                  variant="contained"
                  startIcon={<PictureAsPdf />}
                  onClick={handleExportPDF}
                  color="error"
                  fullWidth
                >
                  PDF
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Estadísticas Principales */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <TrendingUp color="success" sx={{ fontSize: 40, mr: 2 }} />
                  <Box>
                    <Typography variant="h4" component="div">
                      {totals.totalVentas}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Total Ventas
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
                  <TrendingUp color="primary" sx={{ fontSize: 40, mr: 2 }} />
                  <Box>
                    <Typography variant="h4" component="div">
                      {formatPrice(totals.totalIngresos)}
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
                  <TrendingDown color="warning" sx={{ fontSize: 40, mr: 2 }} />
                  <Box>
                    <Typography variant="h4" component="div">
                      {formatPrice(totals.totalGastos)}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Gastos Totales
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
                  <TrendingUp color="success" sx={{ fontSize: 40, mr: 2 }} />
                  <Box>
                    <Typography variant="h4" component="div">
                      {formatPrice(totals.ganancia)}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Ganancia Neta
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Gráficos y Tablas */}
        <Grid container spacing={3}>
          {/* Gráfico de Ventas Mensuales */}
          <Grid item xs={12} md={8}>
            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <BarChart sx={{ mr: 1 }} />
                Ventas Mensuales
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'grey.50' }}>
                <Typography variant="body1" color="textSecondary">
                  📊 Gráfico de Barras - Ventas vs Compras por Mes
                </Typography>
              </Box>
              
              <Box sx={{ mt: 2 }}>
                <Typography variant="caption" color="textSecondary">
                  * Gráfico interactivo con Chart.js o Recharts
                </Typography>
              </Box>
            </Paper>
          </Grid>

          {/* Estadísticas de Reparaciones */}
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <PieChart sx={{ mr: 1 }} />
                Estado Reparaciones
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              {repairStats.map((stat, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">{stat.status}</Typography>
                    <Typography variant="body2" fontWeight="bold">
                      {stat.count} ({stat.percentage}%)
                    </Typography>
                  </Box>
                  <Box sx={{ width: '100%', bgcolor: 'grey.200', borderRadius: 1, height: 8 }}>
                    <Box
                      sx={{
                        width: `${stat.percentage}%`,
                        bgcolor: index === 0 ? 'warning.main' : index === 1 ? 'error.main' : 'success.main',
                        height: 8,
                        borderRadius: 1
                      }}
                    />
                  </Box>
                </Box>
              ))}
            </Paper>
          </Grid>

          {/* Top Productos */}
          <Grid item xs={12}>
            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                🏆 Top Productos por Ventas
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Posición</TableCell>
                      <TableCell>Marca</TableCell>
                      <TableCell>Modelo</TableCell>
                      <TableCell align="center">Ventas</TableCell>
                      <TableCell align="right">Ingresos</TableCell>
                      <TableCell align="center">Rendimiento</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {topProducts.map((product, index) => (
                      <TableRow key={index} hover>
                        <TableCell>
                          <Chip
                            label={`#${index + 1}`}
                            color={index === 0 ? 'success' : index === 1 ? 'primary' : index === 2 ? 'warning' : 'default'}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>{product.brand}</TableCell>
                        <TableCell>{product.model}</TableCell>
                        <TableCell align="center">
                          <Typography variant="h6" color="primary">
                            {product.ventas}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body2" fontWeight="bold">
                            {formatPrice(product.ingresos)}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <TrendingUp color="success" sx={{ fontSize: 16, mr: 0.5 }} />
                            <Typography variant="caption" color="success.main">
                              +{Math.floor(Math.random() * 20 + 10)}%
                            </Typography>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>

        {/* Información del Reporte */}
        <Paper elevation={1} sx={{ p: 3, mt: 3, bgcolor: 'grey.50' }}>
          <Typography variant="h6" gutterBottom>
            📋 Información del Reporte
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <Typography variant="body2" color="textSecondary">
                <strong>Tipo:</strong> {reportType.charAt(0).toUpperCase() + reportType.slice(1)}
              </Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="body2" color="textSecondary">
                <strong>Período:</strong> {dateRange === 'personalizado' ? `${startDate} - ${endDate}` : dateRange}
              </Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="body2" color="textSecondary">
                <strong>Generado:</strong> {new Date().toLocaleDateString('es-CO')}
              </Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="body2" color="textSecondary">
                <strong>Total Registros:</strong> {salesData.length}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Paper>
    </Container>
  );
}

export default Reports;

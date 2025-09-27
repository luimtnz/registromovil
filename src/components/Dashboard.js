import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import SyncStatus from './SyncStatus';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Divider,
  Alert,
  CircularProgress
} from '@mui/material';
import {
  TrendingUp,
  Phone,
  Schedule,
  Build,
  ShoppingCart,
  Store,
  MonetizationOn,
  Inventory
} from '@mui/icons-material';

function Dashboard() {
  const navigate = useNavigate();
  const { license } = useAuth();
  const { getStats, equipment, sales, purchases, repairs, loading, error } = useData();
  
  const [stats, setStats] = useState({
    totalEquipment: 0,
    totalSales: 0,
    totalRepairs: 0,
    totalPurchases: 0,
    inRepair: 0,
    pending: 0,
    delivered: 0,
    inInventory: 0
  });

  useEffect(() => {
    const loadStats = () => {
      try {
        const currentStats = getStats();
        setStats(currentStats);
      } catch (error) {
        console.error('Error cargando estadísticas:', error);
      }
    };

    loadStats();
  }, [getStats]);

  // Verificar límites de licencia
  useEffect(() => {
    if (license && equipment.length >= license.maxEquipment * 0.9) {
      // Mostrar advertencia cuando se acerque al límite
      console.warn(`Límite de equipos alcanzado: ${equipment.length}/${license.maxEquipment}`);
    }
  }, [license, equipment.length]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'vendido': return 'success';
      case 'en_reparacion': return 'warning';
      case 'entregado': return 'info';
      case 'pendiente': return 'error';
      case 'en_inventario': return 'default';
      default: return 'default';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'vendido': return 'Vendido';
      case 'en_reparacion': return 'En Reparación';
      case 'entregado': return 'Entregado';
      case 'pendiente': return 'Pendiente';
      case 'en_inventario': return 'En Inventario';
      default: return status;
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'venta': return <Phone color="primary" />;
      case 'reparacion': return <Build color="secondary" />;
      case 'compra': return <ShoppingCart color="success" />;
      default: return <Phone color="primary" />;
    }
  };

  const getTypeText = (type) => {
    switch (type) {
      case 'venta': return 'Venta';
      case 'reparacion': return 'Reparación';
      case 'compra': return 'Compra';
      default: return type;
    }
  };

  const getActionIcon = (type) => {
    switch (type) {
      case 'venta': return <Phone color="primary" />;
      case 'reparacion': return <Build color="secondary" />;
      case 'compra': return <ShoppingCart color="success" />;
      case 'entrega': return <ShoppingCart color="info" />;
      default: return <Schedule color="action" />;
    }
  };

  // Funciones para las acciones rápidas
  const handleQuickAction = (action) => {
    switch (action) {
      case 'venta':
        navigate('/user-register', { state: { defaultType: 'venta' } });
        break;
      case 'compra':
        navigate('/user-register', { state: { defaultType: 'compra' } });
        break;
      case 'reparacion':
        navigate('/user-register', { state: { defaultType: 'reparacion' } });
        break;
      case 'inventario':
        navigate('/inventory');
        break;
      default:
        break;
    }
  };

  // Obtener equipos recientes
  const getRecentEquipment = () => {
    return equipment
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 4);
  };

  // Obtener acciones recientes
  const getRecentActions = () => {
    const allActions = [];
    
    // Agregar ventas recientes
    sales.slice(0, 2).forEach(sale => {
      allActions.push({
        id: `sale-${sale.id}`,
        action: 'Nueva venta registrada',
        equipment: `${sale.brand} ${sale.model}`,
        user: 'Sistema',
        time: new Date(sale.createdAt).toLocaleDateString(),
        type: 'venta'
      });
    });

    // Agregar reparaciones recientes
    repairs.slice(0, 2).forEach(repair => {
      allActions.push({
        id: `repair-${repair.id}`,
        action: 'Reparación registrada',
        equipment: `${repair.brand} ${repair.model}`,
        user: 'Sistema',
        time: new Date(repair.createdAt).toLocaleDateString(),
        type: 'reparacion'
      });
    });

    // Agregar compras recientes
    purchases.slice(0, 2).forEach(purchase => {
      allActions.push({
        id: `purchase-${purchase.id}`,
        action: 'Nueva compra registrada',
        equipment: `${purchase.brand} ${purchase.model}`,
        user: 'Sistema',
        time: new Date(purchase.createdAt).toLocaleDateString(),
        type: 'compra'
      });
    });

    return allActions
      .sort((a, b) => new Date(b.time) - new Date(a.time))
      .slice(0, 4);
  };

  if (loading) {
    return (
      <Container maxWidth="xl">
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
          <CircularProgress size={60} />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3, mb: 2 }}>
        <Typography variant="h3" component="h1">
          📊 Registro Móvil
        </Typography>
        <SyncStatus />
      </Box>

      {/* Advertencia de límite de licencia */}
      {license && equipment.length >= license.maxEquipment * 0.9 && (
        <Alert 
          severity="warning" 
          sx={{ mb: 3 }}
          action={
            <Button color="inherit" size="small">
              Actualizar Licencia
            </Button>
          }
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* <VpnKey sx={{ mr: 1 }} /> */}
            <Typography>
              Está cerca del límite de equipos de su licencia ({equipment.length}/{license.maxEquipment})
            </Typography>
          </Box>
        </Alert>
      )}

      {/* Mostrar errores del sistema */}
      {error && (
        <Alert 
          severity="error" 
          sx={{ mb: 3 }}
          // onClose={clearError} // clearError is not imported
        >
          {error}
        </Alert>
      )}

      {/* Estadísticas principales */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Phone color="primary" sx={{ fontSize: 40, mr: 2 }} />
                <Box>
                  <Typography variant="h4" component="div">
                    {stats.totalEquipment}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Total Equipos
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
                    {stats.totalSales}
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
                <ShoppingCart color="success" sx={{ fontSize: 40, mr: 2 }} />
                <Box>
                  <Typography variant="h4" component="div">
                    {stats.totalPurchases}
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
                <Build color="warning" sx={{ fontSize: 40, mr: 2 }} />
                <Box>
                  <Typography variant="h4" component="div">
                    {stats.totalRepairs}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Reparaciones
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Métricas de Accesorios */}
      {stats.accessories && (
        <>
          <Typography variant="h5" gutterBottom sx={{ mt: 3, mb: 2 }}>
            <Store sx={{ mr: 1, verticalAlign: 'middle' }} />
            Resumen de Accesorios
          </Typography>
          
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ bgcolor: 'primary.50', border: '1px solid', borderColor: 'primary.200' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <MonetizationOn color="primary" sx={{ fontSize: 40, mr: 2 }} />
                    <Box>
                      <Typography variant="h6" component="div" color="primary">
                        ${stats.accessories.totalInvestment?.toLocaleString() || 0}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Inversión Total
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ bgcolor: 'success.50', border: '1px solid', borderColor: 'success.200' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Inventory color="success" sx={{ fontSize: 40, mr: 2 }} />
                    <Box>
                      <Typography variant="h6" component="div" color="success.main">
                        ${stats.accessories.totalInventoryValue?.toLocaleString() || 0}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Valor Inventario
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ bgcolor: 'warning.50', border: '1px solid', borderColor: 'warning.200' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <TrendingUp color="warning" sx={{ fontSize: 40, mr: 2 }} />
                    <Box>
                      <Typography variant="h6" component="div" color="warning.main">
                        ${stats.accessories.totalProfit?.toLocaleString() || 0}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Ganancia ({stats.accessories.profitMargin?.toFixed(1) || 0}%)
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ bgcolor: 'info.50', border: '1px solid', borderColor: 'info.200' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Store color="info" sx={{ fontSize: 40, mr: 2 }} />
                    <Box>
                      <Typography variant="h6" component="div" color="info.main">
                        {stats.accessories.totalStock || 0}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Stock Total ({stats.accessories.totalItems || 0} productos)
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Alertas de Accesorios */}
          {stats.accessories.lowStockItems > 0 && (
            <Alert severity="warning" sx={{ mb: 3 }}>
              ⚠️ {stats.accessories.lowStockItems} accesorio(s) con stock bajo. 
              <Button 
                size="small" 
                onClick={() => navigate('/accessories')}
                sx={{ ml: 2 }}
              >
                Ver Accesorios
              </Button>
            </Alert>
          )}
        </>
      )}

      <Grid container spacing={3}>
        {/* Estado de reparaciones */}
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <Build sx={{ mr: 1 }} />
              Estado de Reparaciones
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'warning.light', borderRadius: 1 }}>
                  <Typography variant="h4" color="warning.dark">
                    {stats.inRepair}
                  </Typography>
                  <Typography variant="body2">En Reparación</Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'error.light', borderRadius: 1 }}>
                  <Typography variant="h4" color="error.dark">
                    {stats.pending}
                  </Typography>
                  <Typography variant="body2">Pendientes</Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'info.light', borderRadius: 1 }}>
                  <Typography variant="h4" color="info.dark">
                    {stats.delivered}
                  </Typography>
                  <Typography variant="body2">Entregados</Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'grey.300', borderRadius: 1 }}>
                  <Typography variant="h4" color="grey.700">
                    {stats.inInventory}
                  </Typography>
                  <Typography variant="body2">En Inventario</Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Equipos recientes */}
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center' }}>
                <Schedule sx={{ mr: 1 }} />
                Equipos Recientes
              </Typography>
              <Button
                size="small"
                // startIcon={<Visibility />} // Visibility is not imported
                onClick={() => navigate('/inventory')}
              >
                Ver Todo
              </Button>
            </Box>
            <Divider sx={{ mb: 2 }} />
            
            {equipment.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="body2" color="textSecondary">
                  No hay equipos registrados aún
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => navigate('/user-register')}
                  sx={{ mt: 1 }}
                >
                  Registrar Primer Equipo
                </Button>
              </Box>
            ) : (
              <List>
                {getRecentEquipment().map((item, index) => (
                  <React.Fragment key={item.id}>
                    <ListItem>
                      <ListItemIcon>
                        {getTypeIcon(item.type)}
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="body1">
                              {item.brand} {item.model}
                            </Typography>
                            <Chip
                              label={getStatusText(item.status)}
                              color={getStatusColor(item.status)}
                              size="small"
                            />
                          </Box>
                        }
                        secondary={
                          <Box>
                            <Typography variant="caption" display="block">
                              IMEI 1: {item.imei1}
                            </Typography>
                            {item.imei2 && (
                              <Typography variant="caption" display="block" color="textSecondary">
                                IMEI 2: {item.imei2}
                              </Typography>
                            )}
                            <Typography variant="caption" color="textSecondary">
                              {getTypeText(item.type)} • {new Date(item.createdAt).toLocaleDateString()}
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                    {index < getRecentEquipment().length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            )}
          </Paper>
        </Grid>
      </Grid>

      {/* Acciones rápidas */}
      <Paper elevation={2} sx={{ p: 3, mt: 3 }}>
        <Typography variant="h5" gutterBottom>
          Acciones Rápidas
        </Typography>
        <Divider sx={{ mb: 2 }} />
        
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Card 
              sx={{ 
                cursor: 'pointer', 
                '&:hover': { 
                  bgcolor: 'grey.50',
                  transform: 'translateY(-2px)',
                  boxShadow: 3
                },
                transition: 'all 0.2s ease-in-out'
              }}
              onClick={() => handleQuickAction('venta')}
            >
              <CardContent sx={{ textAlign: 'center' }}>
                <Phone color="primary" sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h6">Registrar Venta</Typography>
                <Typography variant="body2" color="textSecondary">
                  Nuevo equipo vendido
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card 
              sx={{ 
                cursor: 'pointer', 
                '&:hover': { 
                  bgcolor: 'grey.50',
                  transform: 'translateY(-2px)',
                  boxShadow: 3
                },
                transition: 'all 0.2s ease-in-out'
              }}
              onClick={() => handleQuickAction('compra')}
            >
              <CardContent sx={{ textAlign: 'center' }}>
                <ShoppingCart color="success" sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h6">Registrar Compra</Typography>
                <Typography variant="body2" color="textSecondary">
                  Equipo comprado
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card 
              sx={{ 
                cursor: 'pointer', 
                '&:hover': { 
                  bgcolor: 'grey.50',
                  transform: 'translateY(-2px)',
                  boxShadow: 3
                },
                transition: 'all 0.2s ease-in-out'
              }}
              onClick={() => handleQuickAction('reparacion')}
            >
              <CardContent sx={{ textAlign: 'center' }}>
                <Build color="secondary" sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h6">Registrar Reparación</Typography>
                <Typography variant="body2" color="textSecondary">
                  Equipo para reparar
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card 
              sx={{ 
                cursor: 'pointer', 
                '&:hover': { 
                  bgcolor: 'grey.50',
                  transform: 'translateY(-2px)',
                  boxShadow: 3
                },
                transition: 'all 0.2s ease-in-out'
              }}
              onClick={() => handleQuickAction('inventario')}
            >
              <CardContent sx={{ textAlign: 'center' }}>
                <ShoppingCart color="info" sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h6">Ver Inventario</Typography>
                <Typography variant="body2" color="textSecondary">
                  Gestionar equipos
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>

      {/* Acciones recientes del sistema */}
      <Paper elevation={2} sx={{ p: 3, mt: 3 }}>
        <Typography variant="h5" gutterBottom>
          Actividad Reciente del Sistema
        </Typography>
        <Divider sx={{ mb: 2 }} />
        
        {getRecentActions().length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="body2" color="textSecondary">
              No hay actividad reciente
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Comience registrando equipos para ver la actividad aquí
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={2}>
            {getRecentActions().map((action) => (
              <Grid item xs={12} sm={6} md={3} key={action.id}>
                <Card sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    {getActionIcon(action.type)}
                    <Typography variant="body2" color="textSecondary" sx={{ ml: 1 }}>
                      {action.time}
                    </Typography>
                  </Box>
                  <Typography variant="body2" fontWeight="bold" gutterBottom>
                    {action.action}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    {action.equipment}
                  </Typography>
                  <Typography variant="caption" display="block" color="textSecondary">
                    {action.user}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Paper>
    </Container>
  );
}

export default Dashboard;

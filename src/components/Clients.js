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
  TextField,
  Grid,
  IconButton,
  Tooltip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Card,
  CardContent,
  Avatar,
  Fab,
  Snackbar,
  Alert,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  FormControlLabel,
  Switch
} from '@mui/material';
import {
  Add,
  Edit,
  Visibility,
  Phone,
  Email,
  WhatsApp,
  Star,
  Loyalty,
  Build,
  Print,
  PersonAdd,
  Business,
  Notifications
} from '@mui/icons-material';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';

function Clients() {
  // Estado de clientes mejorado
  const [clients, setClients] = useState([
    {
      id: 1,
      name: 'Juan Pérez',
      email: 'juan@email.com',
      phone: '3001234567',
      document: '12345678',
      type: 'individual',
      address: 'Calle 123 #45-67, Bogotá',
      registrationDate: '2023-01-15',
      totalPurchases: 5,
      totalSpent: 2500000,
      loyaltyPoints: 1250,
      tier: 'gold',
      status: 'active',
      preferences: {
        brands: ['Samsung', 'iPhone'],
        categories: ['smartphone', 'tablet'],
        notifications: {
          email: true,
          whatsapp: true,
          sms: false
        }
      },
      equipment: [
        {
          id: 1,
          imei: '123456789012345',
          brand: 'Samsung',
          model: 'Galaxy S21',
          type: 'purchased',
          date: '2024-01-15',
          price: 1200000,
          warranty: '12 meses',
          status: 'active'
        },
        {
          id: 2,
          imei: '987654321098765',
          brand: 'iPhone',
          model: '13 Pro',
          type: 'repair',
          date: '2024-01-20',
          cost: 250000,
          status: 'completed'
        }
      ],
      repairs: [
        {
          id: 1,
          equipment: 'iPhone 13 Pro',
          issue: 'Pantalla rota',
          date: '2024-01-20',
          cost: 250000,
          status: 'completed',
          technician: 'Carlos Técnico',
          notes: 'Reparación exitosa'
        }
      ]
    },
    {
      id: 2,
      name: 'María González',
      email: 'maria@email.com',
      phone: '3009876543',
      document: '87654321',
      type: 'individual',
      address: 'Carrera 78 #12-34, Medellín',
      registrationDate: '2023-03-20',
      totalPurchases: 3,
      totalSpent: 1800000,
      loyaltyPoints: 750,
      tier: 'silver',
      status: 'active',
      preferences: {
        brands: ['Xiaomi', 'Huawei'],
        categories: ['smartphone'],
        notifications: {
          email: true,
          whatsapp: false,
          sms: true
        }
      },
      equipment: [
        {
          id: 3,
          imei: '111222333444555',
          brand: 'Huawei',
          model: 'P30 Lite',
          type: 'sold',
          date: '2024-01-22',
          price: 450000,
          status: 'sold'
        }
      ],
      repairs: []
    },
    {
      id: 3,
      name: 'Distribuidor ABC',
      email: 'ventas@distribuidorabc.com',
      phone: '3005554444',
      document: '90123456',
      type: 'business',
      address: 'Zona Industrial, Cali',
      registrationDate: '2022-11-10',
      totalPurchases: 25,
      totalSpent: 15000000,
      loyaltyPoints: 5000,
      tier: 'platinum',
      status: 'active',
      preferences: {
        brands: ['Samsung', 'Xiaomi', 'Motorola'],
        categories: ['smartphone', 'tablet', 'accesorios'],
        notifications: {
          email: true,
          whatsapp: true,
          sms: true
        }
      },
      equipment: [
        {
          id: 4,
          imei: '555666777888999',
          brand: 'Xiaomi',
          model: 'Redmi Note 10',
          type: 'inventory',
          date: '2024-01-18',
          status: 'in_stock'
        }
      ],
      repairs: []
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterTier, setFilterTier] = useState('todos');
  const [filterStatus, setFilterStatus] = useState('todos');
  const [selectedClient, setSelectedClient] = useState(null);
  const [clientDialogOpen, setClientDialogOpen] = useState(false);

  const [activeTab, setActiveTab] = useState(0);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

  // Tiers de fidelización
  const tiers = {
    bronze: { name: 'Bronce', minPoints: 0, color: 'default', discount: '0%' },
    silver: { name: 'Plata', minPoints: 500, color: 'default', discount: '5%' },
    gold: { name: 'Oro', minPoints: 1000, color: 'warning', discount: '10%' },
    platinum: { name: 'Platino', minPoints: 2500, color: 'primary', discount: '15%' },
    diamond: { name: 'Diamante', minPoints: 5000, color: 'secondary', discount: '20%' }
  };

  const getTierColor = (tier) => {
    return tiers[tier]?.color || 'default';
  };

  const getTierName = (tier) => {
    return tiers[tier]?.name || tier;
  };

  const getTierDiscount = (tier) => {
    return tiers[tier]?.discount || '0%';
  };

  const filteredClients = clients.filter(client => {
    const matchesTier = filterTier === 'todos' || client.tier === filterTier;
    const matchesStatus = filterStatus === 'todos' || client.status === filterStatus;
    const matchesSearch = 
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.phone.includes(searchTerm) ||
      client.document.includes(searchTerm);
    
    return matchesTier && matchesStatus && matchesSearch;
  });

  const handleClientDetails = (client) => {
    setSelectedClient(client);
    setClientDialogOpen(true);
  };

  const handleAddClient = () => {
    setSnackbar({
      open: true,
      message: 'Funcionalidad de nuevo cliente próximamente disponible',
      severity: 'info'
    });
  };

  const handleWhatsApp = (phone, message) => {
    const whatsappUrl = `https://wa.me/57${phone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleEmail = (email, subject, body) => {
    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoUrl);
  };

  const handleNotificationToggle = (clientId, type) => {
    setClients(prev => prev.map(client => {
      if (client.id === clientId) {
        return {
          ...client,
          preferences: {
            ...client.preferences,
            notifications: {
              ...client.preferences.notifications,
              [type]: !client.preferences.notifications[type]
            }
          }
        };
      }
      return client;
    }));
  };

  const formatPrice = (price) => {
    if (!price) return '-';
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  };

  const calculateNextTier = (currentPoints) => {
    const currentTier = Object.keys(tiers).find(tier => 
      currentPoints >= tiers[tier].minPoints && 
      (tier === 'diamond' || currentPoints < tiers[Object.keys(tiers)[Object.keys(tiers).indexOf(tier) + 1]]?.minPoints)
    );
    
    if (currentTier === 'diamond') return null;
    
    const nextTier = Object.keys(tiers)[Object.keys(tiers).indexOf(currentTier) + 1];
    const pointsNeeded = tiers[nextTier].minPoints - currentPoints;
    
    return { tier: nextTier, pointsNeeded, discount: tiers[nextTier].discount };
  };

  return (
    <Container maxWidth="xl">
      <Paper elevation={3} sx={{ p: 4, mt: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1">
            👥 Gestión de Clientes Inteligente
          </Typography>
          <Button
            variant="contained"
            startIcon={<PersonAdd />}
            onClick={handleAddClient}
          >
            Nuevo Cliente
          </Button>
        </Box>

        {/* Filtros */}
        <Box sx={{ mb: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="Buscar cliente"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Nombre, email, teléfono o documento"
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Tier</InputLabel>
                <Select
                  value={filterTier}
                  onChange={(e) => setFilterTier(e.target.value)}
                  label="Tier"
                >
                  <MenuItem value="todos">Todos los Tiers</MenuItem>
                  {Object.keys(tiers).map(tier => (
                    <MenuItem key={tier} value={tier}>
                      {tiers[tier].name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Estado</InputLabel>
                <Select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  label="Estado"
                >
                  <MenuItem value="todos">Todos</MenuItem>
                  <MenuItem value="active">Activo</MenuItem>
                  <MenuItem value="inactive">Inactivo</MenuItem>
                  <MenuItem value="suspended">Suspendido</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  variant="outlined"
                  startIcon={<Notifications />}
                  onClick={() => setSnackbar({
                    open: true,
                    message: 'Enviando notificaciones masivas...',
                    severity: 'info'
                  })}
                >
                  Notificar
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Print />}
                  onClick={() => window.print()}
                >
                  Imprimir
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Tabla de clientes */}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Cliente</TableCell>
                <TableCell>Tipo</TableCell>
                <TableCell>Tier</TableCell>
                <TableCell>Puntos</TableCell>
                <TableCell>Compras</TableCell>
                <TableCell>Total Gastado</TableCell>
                <TableCell>Última Actividad</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredClients.map((client) => {
                const nextTier = calculateNextTier(client.loyaltyPoints);
                return (
                  <TableRow key={client.id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar sx={{ bgcolor: client.type === 'business' ? 'primary.main' : 'secondary.main' }}>
                          {client.type === 'business' ? <Business /> : client.name.charAt(0)}
                        </Avatar>
                        <Box>
                          <Typography variant="body1" fontWeight="bold">
                            {client.name}
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            {client.email}
                          </Typography>
                          <Typography variant="caption" display="block" color="textSecondary">
                            {client.phone}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={client.type === 'business' ? 'Empresa' : 'Individual'}
                        color={client.type === 'business' ? 'primary' : 'secondary'}
                        size="small"
                        icon={client.type === 'business' ? <Business /> : <PersonAdd />}
                      />
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Chip
                          label={getTierName(client.tier)}
                          color={getTierColor(client.tier)}
                          size="small"
                          icon={<Star />}
                        />
                        <Typography variant="caption" display="block" color="textSecondary">
                          {getTierDiscount(client.tier)} descuento
                        </Typography>
                        {nextTier && (
                          <Typography variant="caption" display="block" color="primary">
                            {nextTier.pointsNeeded} pts para {getTierName(nextTier.tier)}
                          </Typography>
                        )}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h6" color="primary">
                          {client.loyaltyPoints.toLocaleString()}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          pts
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h6" color="success.main">
                          {client.totalPurchases}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          compras
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="bold" color="primary">
                        {formatPrice(client.totalSpent)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {client.registrationDate}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Tooltip title="Ver detalles">
                          <IconButton 
                            size="small" 
                            color="primary"
                            onClick={() => handleClientDetails(client)}
                          >
                            <Visibility />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="WhatsApp">
                          <IconButton 
                            size="small" 
                            color="success"
                            onClick={() => handleWhatsApp(
                              client.phone,
                              `Hola ${client.name}! Te contactamos desde Registro Móvil.`
                            )}
                          >
                            <WhatsApp />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Email">
                          <IconButton 
                            size="small" 
                            color="info"
                            onClick={() => handleEmail(
                              client.email,
                              'Registro Móvil - Información Importante',
                              `Hola ${client.name},\n\nTe contactamos desde Registro Móvil.\n\nSaludos cordiales.`
                            )}
                          >
                            <Email />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Resumen de fidelización */}
        <Box sx={{ mt: 3, p: 3, bgcolor: 'grey.50', borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            🎯 Programa de Fidelización
          </Typography>
          <Grid container spacing={3}>
            {Object.entries(tiers).map(([tier, info]) => (
              <Grid item xs={6} md={2} key={tier}>
                <Card variant="outlined">
                  <CardContent sx={{ textAlign: 'center', p: 2 }}>
                    <Typography variant="h4" color={info.color === 'default' ? 'text.primary' : info.color}>
                      {clients.filter(c => c.tier === tier).length}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {info.name}
                    </Typography>
                    <Typography variant="caption" color="primary">
                      {info.discount} descuento
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Paper>

      {/* Dialog de detalles del cliente */}
      <Dialog 
        open={clientDialogOpen} 
        onClose={() => setClientDialogOpen(false)} 
        maxWidth="md" 
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Avatar sx={{ bgcolor: selectedClient?.type === 'business' ? 'primary.main' : 'secondary.main' }}>
              {selectedClient?.type === 'business' ? <Business /> : selectedClient?.name?.charAt(0)}
            </Avatar>
            <Typography variant="h6">
              {selectedClient?.name}
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          {selectedClient && (
            <Box>
              <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)} sx={{ mb: 2 }}>
                <Tab label="Información" icon={<PersonAdd />} />
                <Tab label="Equipos" icon={<Phone />} />
                <Tab label="Reparaciones" icon={<Build />} />
                <Tab label="Preferencias" icon={<Loyalty />} />
              </Tabs>

              {activeTab === 0 && (
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" gutterBottom>Información Personal</Typography>
                    <List>
                      <ListItem>
                        <ListItemText 
                          primary="Email" 
                          secondary={selectedClient.email}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText 
                          primary="Teléfono" 
                          secondary={selectedClient.phone}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText 
                          primary="Documento" 
                          secondary={selectedClient.document}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText 
                          primary="Dirección" 
                          secondary={selectedClient.address}
                        />
                      </ListItem>
                    </List>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" gutterBottom>Estadísticas</Typography>
                    <List>
                      <ListItem>
                        <ListItemText 
                          primary="Total Compras" 
                          secondary={selectedClient.totalPurchases}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText 
                          primary="Total Gastado" 
                          secondary={formatPrice(selectedClient.totalSpent)}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText 
                          primary="Puntos de Fidelización" 
                          secondary={selectedClient.loyaltyPoints.toLocaleString()}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText 
                          primary="Tier Actual" 
                          secondary={
                            <Chip 
                              label={getTierName(selectedClient.tier)} 
                              color={getTierColor(selectedClient.tier)}
                              size="small"
                            />
                          }
                        />
                      </ListItem>
                    </List>
                  </Grid>
                </Grid>
              )}

              {activeTab === 1 && (
                <Box>
                  <Typography variant="h6" gutterBottom>Equipos del Cliente</Typography>
                  <List>
                    {selectedClient.equipment.map((equipment, index) => (
                      <ListItem key={index}>
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: 'primary.main' }}>
                            <Phone />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={`${equipment.brand} ${equipment.model}`}
                          secondary={
                            <Box>
                              <Typography variant="body2">
                                IMEI: {equipment.imei}
                              </Typography>
                              <Typography variant="caption" color="textSecondary">
                                {equipment.type} • {equipment.date}
                              </Typography>
                            </Box>
                          }
                        />
                        <Chip 
                          label={equipment.status} 
                          color={equipment.status === 'active' ? 'success' : 'default'}
                          size="small"
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}

              {activeTab === 2 && (
                <Box>
                  <Typography variant="h6" gutterBottom>Historial de Reparaciones</Typography>
                  {selectedClient.repairs.length > 0 ? (
                    <List>
                      {selectedClient.repairs.map((repair, index) => (
                        <ListItem key={index}>
                          <ListItemAvatar>
                            <Avatar sx={{ bgcolor: 'warning.main' }}>
                              <Build />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={repair.equipment}
                            secondary={
                              <Box>
                                <Typography variant="body2">
                                  {repair.issue}
                                </Typography>
                                <Typography variant="caption" color="textSecondary">
                                  {repair.date} • {repair.technician}
                                </Typography>
                              </Box>
                            }
                          />
                          <Box sx={{ textAlign: 'right' }}>
                            <Typography variant="body2" fontWeight="bold">
                              {formatPrice(repair.cost)}
                            </Typography>
                            <Chip 
                              label={repair.status} 
                              color={repair.status === 'completed' ? 'success' : 'warning'}
                              size="small"
                            />
                          </Box>
                        </ListItem>
                      ))}
                    </List>
                  ) : (
                    <Typography variant="body2" color="textSecondary" align="center">
                      No hay reparaciones registradas
                    </Typography>
                  )}
                </Box>
              )}

              {activeTab === 3 && (
                <Box>
                  <Typography variant="h6" gutterBottom>Preferencias y Notificaciones</Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle1" gutterBottom>Marcas Preferidas</Typography>
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        {selectedClient.preferences.brands.map((brand, index) => (
                          <Chip key={index} label={brand} size="small" />
                        ))}
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle1" gutterBottom>Categorías Preferidas</Typography>
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        {selectedClient.preferences.categories.map((category, index) => (
                          <Chip key={index} label={category} size="small" />
                        ))}
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle1" gutterBottom>Notificaciones</Typography>
                      <Box sx={{ display: 'flex', gap: 2 }}>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={selectedClient.preferences.notifications.email}
                              onChange={() => handleNotificationToggle(selectedClient.id, 'email')}
                            />
                          }
                          label="Email"
                        />
                        <FormControlLabel
                          control={
                            <Switch
                              checked={selectedClient.preferences.notifications.whatsapp}
                              onChange={() => handleNotificationToggle(selectedClient.id, 'whatsapp')}
                            />
                          }
                          label="WhatsApp"
                        />
                        <FormControlLabel
                          control={
                            <Switch
                              checked={selectedClient.preferences.notifications.sms}
                              onChange={() => handleNotificationToggle(selectedClient.id, 'sms')}
                            />
                          }
                          label="SMS"
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setClientDialogOpen(false)}>Cerrar</Button>
          <Button 
            variant="contained" 
            startIcon={<Edit />}
          >
            Editar Cliente
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar para notificaciones */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert 
          onClose={() => setSnackbar({ ...snackbar, open: false })} 
          severity={snackbar.severity}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* FAB para agregar cliente */}
      <Fab
        color="primary"
        aria-label="add client"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        onClick={handleAddClient}
      >
        <Add />
      </Fab>
    </Container>
  );
}

export default Clients;

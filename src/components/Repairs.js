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

  Stepper,
  Step,
  StepLabel,
  StepContent,
  LinearProgress,
  ImageList,
  ImageListItem,
  ImageListItemBar
} from '@mui/material';
import {
  Add,
  Edit,
  Visibility,
  Email,
  WhatsApp,
  Build,
  CheckCircle,
  Warning,
  Info,
  PhotoCamera,
  Print,
  Send,
  Schedule,
  AttachMoney,
  LocalShipping,
  Done,
  Pending,
  Block
} from '@mui/icons-material';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';

function Repairs() {
  // Estado de reparaciones avanzado
  const repairs = [
    {
      id: 1,
      ticketNumber: 'REP-001',
      clientName: 'Juan Pérez',
      clientPhone: '3001234567',
      clientEmail: 'juan@email.com',
      equipment: {
        brand: 'iPhone',
        model: '13 Pro',
        imei: '987654321098765',
        color: 'Sierra Blue',
        capacity: '256GB'
      },
      issue: 'Pantalla rota, no enciende',
      diagnosis: 'Pantalla LCD dañada, posible problema de batería',
      status: 'en_reparacion',
      priority: 'alta',
      technician: 'Carlos Técnico',
      estimatedTime: '3 días',
      actualTime: '2 días',
      cost: 250000,
      deposit: 100000,
      balance: 150000,
      startDate: '2024-01-20',
      estimatedCompletion: '2024-01-23',
      actualCompletion: null,
      warranty: '3 meses',
      notes: 'Cliente muy urgente, pantalla rota completamente',
      photos: {
        before: ['https://via.placeholder.com/300x200/ff0000/ffffff?text=Antes'],
        after: []
      },
      parts: [
        {
          name: 'Pantalla LCD iPhone 13 Pro',
          cost: 180000,
          supplier: 'Proveedor ABC',
          arrivalDate: '2024-01-22'
        }
      ],
      updates: [
        {
          date: '2024-01-20',
          status: 'recibido',
          notes: 'Equipo recibido, iniciando diagnóstico',
          technician: 'Carlos Técnico'
        },
        {
          date: '2024-01-21',
          status: 'diagnosticado',
          notes: 'Diagnóstico completado, esperando repuestos',
          technician: 'Carlos Técnico'
        },
        {
          date: '2024-01-22',
          status: 'en_reparacion',
          notes: 'Repuestos recibidos, iniciando reparación',
          technician: 'Carlos Técnico'
        }
      ]
    },
    {
      id: 2,
      ticketNumber: 'REP-002',
      clientName: 'María González',
      clientPhone: '3009876543',
      clientEmail: 'maria@email.com',
      equipment: {
        brand: 'Samsung',
        model: 'Galaxy S21',
        imei: '123456789012345',
        color: 'Phantom Black',
        capacity: '128GB'
      },
      issue: 'No carga la batería',
      diagnosis: 'Conector de carga dañado, posible problema de placa',
      status: 'esperando_repuestos',
      priority: 'media',
      technician: 'Ana Técnica',
      estimatedTime: '5 días',
      actualTime: '2 días',
      cost: 180000,
      deposit: 80000,
      balance: 100000,
      startDate: '2024-01-18',
      estimatedCompletion: '2024-01-23',
      actualCompletion: null,
      warranty: '3 meses',
      notes: 'Cliente reporta que el problema comenzó después de una caída',
      photos: {
        before: ['https://via.placeholder.com/300x200/ff0000/ffffff?text=Antes'],
        after: []
      },
      parts: [
        {
          name: 'Conector de carga Samsung S21',
          cost: 45000,
          supplier: 'Proveedor XYZ',
          arrivalDate: '2024-01-25'
        }
      ],
      updates: [
        {
          date: '2024-01-18',
          status: 'recibido',
          notes: 'Equipo recibido, iniciando diagnóstico',
          technician: 'Ana Técnica'
        },
        {
          date: '2024-01-19',
          status: 'diagnosticado',
          notes: 'Diagnóstico completado, ordenando repuestos',
          technician: 'Ana Técnica'
        }
      ]
    },
    {
      id: 3,
      ticketNumber: 'REP-003',
      clientName: 'Carlos Rodríguez',
      clientPhone: '3005554444',
      clientEmail: 'carlos@email.com',
      equipment: {
        brand: 'Xiaomi',
        model: 'Redmi Note 10',
        imei: '555666777888999',
        color: 'Onyx Gray',
        capacity: '64GB'
      },
      issue: 'Problema de audio, no suena',
      diagnosis: 'Altavoz principal dañado',
      status: 'completado',
      priority: 'baja',
      technician: 'Carlos Técnico',
      estimatedTime: '2 días',
      actualTime: '1 día',
      cost: 120000,
      deposit: 60000,
      balance: 60000,
      startDate: '2024-01-15',
      estimatedCompletion: '2024-01-17',
      actualCompletion: '2024-01-16',
      warranty: '3 meses',
      notes: 'Reparación exitosa, cliente satisfecho',
      photos: {
        before: ['https://via.placeholder.com/300x200/ff0000/ffffff?text=Antes'],
        after: ['https://via.placeholder.com/300x200/00ff00/ffffff?text=Después']
      },
      parts: [
        {
          name: 'Altavoz Xiaomi Redmi Note 10',
          cost: 35000,
          supplier: 'Proveedor ABC',
          arrivalDate: '2024-01-16'
        }
      ],
      updates: [
        {
          date: '2024-01-15',
          status: 'recibido',
          notes: 'Equipo recibido, iniciando diagnóstico',
          technician: 'Carlos Técnico'
        },
        {
          date: '2024-01-16',
          status: 'completado',
          notes: 'Reparación completada exitosamente',
          technician: 'Carlos Técnico'
        }
      ]
    }
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('todos');
  const [filterPriority, setFilterPriority] = useState('todos');
  const [selectedRepair, setSelectedRepair] = useState(null);
  const [repairDialogOpen, setRepairDialogOpen] = useState(false);

  const [activeTab, setActiveTab] = useState(0);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

  // Estados de reparación
  const repairStatuses = {
    recibido: { name: 'Recibido', color: 'info', icon: <Info /> },
    diagnosticado: { name: 'Diagnosticado', color: 'warning', icon: <Warning /> },
    esperando_repuestos: { name: 'Esperando Repuestos', color: 'warning', icon: <Pending /> },
    en_reparacion: { name: 'En Reparación', color: 'primary', icon: <Build /> },
    completado: { name: 'Completado', color: 'success', icon: <CheckCircle /> },
    entregado: { name: 'Entregado', color: 'success', icon: <Done /> },
    cancelado: { name: 'Cancelado', color: 'error', icon: <Block /> }
  };

  // Prioridades
  const priorities = {
    baja: { name: 'Baja', color: 'success' },
    media: { name: 'Media', color: 'warning' },
    alta: { name: 'Alta', color: 'error' },
    urgente: { name: 'Urgente', color: 'error' }
  };

  const getStatusColor = (status) => {
    return repairStatuses[status]?.color || 'default';
  };

  const getStatusName = (status) => {
    return repairStatuses[status]?.name || status;
  };

  const getStatusIcon = (status) => {
    return repairStatuses[status]?.icon || <Info />;
  };

  const getPriorityColor = (priority) => {
    return priorities[priority]?.color || 'default';
  };

  const getPriorityName = (priority) => {
    return priorities[priority]?.name || priority;
  };

  const filteredRepairs = repairs.filter(repair => {
    const matchesStatus = filterStatus === 'todos' || repair.status === filterStatus;
    const matchesPriority = filterPriority === 'todos' || repair.priority === filterPriority;
    const matchesSearch = 
      repair.ticketNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      repair.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      repair.equipment.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      repair.equipment.model.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesPriority && matchesSearch;
  });

  const handleRepairDetails = (repair) => {
    setSelectedRepair(repair);
    setRepairDialogOpen(true);
  };

  const handleAddRepair = () => {
    setSnackbar({
      open: true,
      message: 'Funcionalidad de nueva reparación próximamente disponible',
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



  const formatPrice = (price) => {
    if (!price) return '-';
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  };

  const calculateProgress = (repair) => {
    const statusOrder = ['recibido', 'diagnosticado', 'esperando_repuestos', 'en_reparacion', 'completado', 'entregado'];
    const currentIndex = statusOrder.indexOf(repair.status);
    return ((currentIndex + 1) / statusOrder.length) * 100;
  };

  const getRepairStats = () => {
    const total = repairs.length;
    const enReparacion = repairs.filter(r => r.status === 'en_reparacion').length;
    const esperandoRepuestos = repairs.filter(r => r.status === 'esperando_repuestos').length;
    const completados = repairs.filter(r => r.status === 'completado').length;
    const ingresos = repairs.filter(r => r.status === 'completado').reduce((sum, r) => sum + r.cost, 0);
    
    return { total, enReparacion, esperandoRepuestos, completados, ingresos };
  };

  const stats = getRepairStats();

  return (
    <Container maxWidth="xl">
      <Paper elevation={3} sx={{ p: 4, mt: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1">
            🔧 Sistema de Reparaciones Avanzado
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleAddRepair}
          >
            Nueva Reparación
          </Button>
        </Box>

        {/* Estadísticas de reparaciones */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={6} md={2}>
            <Card variant="outlined">
              <CardContent sx={{ textAlign: 'center', p: 2 }}>
                <Typography variant="h4" color="primary">
                  {stats.total}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Total Reparaciones
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} md={2}>
            <Card variant="outlined">
              <CardContent sx={{ textAlign: 'center', p: 2 }}>
                <Typography variant="h4" color="warning.main">
                  {stats.enReparacion}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  En Reparación
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} md={2}>
            <Card variant="outlined">
              <CardContent sx={{ textAlign: 'center', p: 2 }}>
                <Typography variant="h4" color="info.main">
                  {stats.esperandoRepuestos}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Esperando Repuestos
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} md={2}>
            <Card variant="outlined">
              <CardContent sx={{ textAlign: 'center', p: 2 }}>
                <Typography variant="h4" color="success.main">
                  {stats.completados}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Completados
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} md={2}>
            <Card variant="outlined">
              <CardContent sx={{ textAlign: 'center', p: 2 }}>
                <Typography variant="h4" color="secondary.main">
                  {formatPrice(stats.ingresos)}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Ingresos
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} md={2}>
            <Card variant="outlined">
              <CardContent sx={{ textAlign: 'center', p: 2 }}>
                <Typography variant="h4" color="error.main">
                  {repairs.filter(r => r.priority === 'urgente').length}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Urgentes
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Filtros */}
        <Box sx={{ mb: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Buscar reparación"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Ticket, cliente, marca o modelo"
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Estado</InputLabel>
                <Select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  label="Estado"
                >
                  <MenuItem value="todos">Todos los Estados</MenuItem>
                  {Object.entries(repairStatuses).map(([key, value]) => (
                    <MenuItem key={key} value={key}>
                      {value.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Prioridad</InputLabel>
                <Select
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value)}
                  label="Prioridad"
                >
                  <MenuItem value="todos">Todas las Prioridades</MenuItem>
                  {Object.entries(priorities).map(([key, value]) => (
                    <MenuItem key={key} value={key}>
                      {value.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2}>
              <Box sx={{ display: 'flex', gap: 1 }}>
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

        {/* Tabla de reparaciones */}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Ticket</TableCell>
                <TableCell>Cliente</TableCell>
                <TableCell>Equipo</TableCell>
                <TableCell>Problema</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Prioridad</TableCell>
                <TableCell>Técnico</TableCell>
                <TableCell>Progreso</TableCell>
                <TableCell>Costo</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRepairs.map((repair) => (
                <TableRow key={repair.id} hover>
                  <TableCell>
                    <Typography variant="body2" fontWeight="bold" fontFamily="monospace">
                      {repair.ticketNumber}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant="body2" fontWeight="bold">
                        {repair.clientName}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {repair.clientPhone}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant="body2" fontWeight="bold">
                        {repair.equipment.brand} {repair.equipment.model}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {repair.equipment.color} • {repair.equipment.capacity}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ maxWidth: 200 }}>
                      {repair.issue}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {getStatusIcon(repair.status)}
                      <Chip
                        label={getStatusName(repair.status)}
                        color={getStatusColor(repair.status)}
                        size="small"
                      />
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={getPriorityName(repair.priority)}
                      color={getPriorityColor(repair.priority)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {repair.technician}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ width: '100%' }}>
                      <LinearProgress 
                        variant="determinate" 
                        value={calculateProgress(repair)}
                        sx={{ height: 8, borderRadius: 4 }}
                      />
                      <Typography variant="caption" color="textSecondary">
                        {Math.round(calculateProgress(repair))}%
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight="bold" color="primary">
                      {formatPrice(repair.cost)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Tooltip title="Ver detalles">
                        <IconButton 
                          size="small" 
                          color="primary"
                          onClick={() => handleRepairDetails(repair)}
                        >
                          <Visibility />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="WhatsApp">
                        <IconButton 
                          size="small" 
                          color="success"
                          onClick={() => handleWhatsApp(
                            repair.clientPhone,
                            `Hola ${repair.clientName}! Te contactamos sobre tu ${repair.equipment.brand} ${repair.equipment.model} (Ticket: ${repair.ticketNumber}). Estado actual: ${getStatusName(repair.status)}`
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
                            repair.clientEmail,
                            `Reparación ${repair.ticketNumber} - ${repair.equipment.brand} ${repair.equipment.model}`,
                            `Hola ${repair.clientName},\n\nTe contactamos sobre tu reparación:\n\nTicket: ${repair.ticketNumber}\nEquipo: ${repair.equipment.brand} ${repair.equipment.model}\nEstado: ${getStatusName(repair.status)}\n\nSaludos cordiales.`
                          )}
                        >
                          <Email />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Dialog de detalles de reparación */}
      <Dialog 
        open={repairDialogOpen} 
        onClose={() => setRepairDialogOpen(false)} 
        maxWidth="lg" 
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Build color="primary" />
            <Typography variant="h6">
              Reparación {selectedRepair?.ticketNumber}
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          {selectedRepair && (
            <Box>
              <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)} sx={{ mb: 2 }}>
                <Tab label="Información" icon={<Info />} />
                <Tab label="Progreso" icon={<Schedule />} />
                <Tab label="Fotos" icon={<PhotoCamera />} />
                <Tab label="Repuestos" icon={<LocalShipping />} />
                <Tab label="Presupuesto" icon={<AttachMoney />} />
              </Tabs>

              {activeTab === 0 && (
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" gutterBottom>Información del Cliente</Typography>
                    <List>
                      <ListItem>
                        <ListItemText 
                          primary="Nombre" 
                          secondary={selectedRepair.clientName}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText 
                          primary="Teléfono" 
                          secondary={selectedRepair.clientPhone}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText 
                          primary="Email" 
                          secondary={selectedRepair.clientEmail}
                        />
                      </ListItem>
                    </List>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" gutterBottom>Información del Equipo</Typography>
                    <List>
                      <ListItem>
                        <ListItemText 
                          primary="Marca y Modelo" 
                          secondary={`${selectedRepair.equipment.brand} ${selectedRepair.equipment.model}`}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText 
                          primary="IMEI" 
                          secondary={selectedRepair.equipment.imei}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText 
                          primary="Color y Capacidad" 
                          secondary={`${selectedRepair.equipment.color} • ${selectedRepair.equipment.capacity}`}
                        />
                      </ListItem>
                    </List>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>Problema y Diagnóstico</Typography>
                    <Card variant="outlined" sx={{ p: 2 }}>
                      <Typography variant="subtitle1" gutterBottom>Problema Reportado:</Typography>
                      <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                        {selectedRepair.issue}
                      </Typography>
                      <Typography variant="subtitle1" gutterBottom>Diagnóstico:</Typography>
                      <Typography variant="body2" color="textSecondary">
                        {selectedRepair.diagnosis}
                      </Typography>
                    </Card>
                  </Grid>
                </Grid>
              )}

              {activeTab === 1 && (
                <Box>
                  <Typography variant="h6" gutterBottom>Progreso de la Reparación</Typography>
                  <Stepper orientation="vertical" activeStep={selectedRepair.updates.length - 1}>
                    {selectedRepair.updates.map((update, index) => (
                      <Step key={index} active={true}>
                        <StepLabel>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            {getStatusIcon(update.status)}
                            <Typography variant="subtitle1">
                              {getStatusName(update.status)}
                            </Typography>
                          </Box>
                        </StepLabel>
                        <StepContent>
                          <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                            {update.date} • {update.technician}
                          </Typography>
                          <Typography variant="body2">
                            {update.notes}
                          </Typography>
                        </StepContent>
                      </Step>
                    ))}
                  </Stepper>
                </Box>
              )}

              {activeTab === 2 && (
                <Box>
                  <Typography variant="h6" gutterBottom>Fotos Antes y Después</Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle1" gutterBottom>Fotos Antes:</Typography>
                      <ImageList cols={2} rowHeight={200}>
                        {selectedRepair.photos.before.map((photo, index) => (
                          <ImageListItem key={index}>
                            <img
                              src={photo}
                              alt={`Antes ${index + 1}`}
                              loading="lazy"
                            />
                            <ImageListItemBar title={`Antes ${index + 1}`} />
                          </ImageListItem>
                        ))}
                      </ImageList>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle1" gutterBottom>Fotos Después:</Typography>
                      {selectedRepair.photos.after.length > 0 ? (
                        <ImageList cols={2} rowHeight={200}>
                          {selectedRepair.photos.after.map((photo, index) => (
                            <ImageListItem key={index}>
                              <img
                                src={photo}
                                alt={`Después ${index + 1}`}
                                loading="lazy"
                              />
                              <ImageListItemBar title={`Después ${index + 1}`} />
                            </ImageListItem>
                          ))}
                        </ImageList>
                      ) : (
                        <Typography variant="body2" color="textSecondary" align="center">
                          No hay fotos después aún
                        </Typography>
                      )}
                    </Grid>
                  </Grid>
                </Box>
              )}

              {activeTab === 3 && (
                <Box>
                  <Typography variant="h6" gutterBottom>Repuestos Utilizados</Typography>
                  <List>
                    {selectedRepair.parts.map((part, index) => (
                      <ListItem key={index}>
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: 'primary.main' }}>
                            <LocalShipping />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={part.name}
                          secondary={
                            <Box>
                              <Typography variant="body2">
                                Costo: {formatPrice(part.cost)}
                              </Typography>
                              <Typography variant="caption" color="textSecondary">
                                Proveedor: {part.supplier} • Llegada: {part.arrivalDate}
                              </Typography>
                            </Box>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}

              {activeTab === 4 && (
                <Box>
                  <Typography variant="h6" gutterBottom>Presupuesto y Pagos</Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Card variant="outlined" sx={{ p: 2 }}>
                        <Typography variant="subtitle1" gutterBottom>Costos:</Typography>
                        <List>
                          <ListItem>
                            <ListItemText 
                              primary="Costo Total" 
                              secondary={formatPrice(selectedRepair.cost)}
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemText 
                              primary="Anticipo" 
                              secondary={formatPrice(selectedRepair.deposit)}
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemText 
                              primary="Saldo Pendiente" 
                              secondary={formatPrice(selectedRepair.balance)}
                            />
                          </ListItem>
                        </List>
                      </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Card variant="outlined" sx={{ p: 2 }}>
                        <Typography variant="subtitle1" gutterBottom>Garantía:</Typography>
                        <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                          {selectedRepair.warranty}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>Tiempo Estimado:</Typography>
                        <Typography variant="body2" color="textSecondary">
                          {selectedRepair.estimatedTime}
                        </Typography>
                      </Card>
                    </Grid>
                  </Grid>
                </Box>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRepairDialogOpen(false)}>Cerrar</Button>
          <Button 
            variant="outlined" 
            startIcon={<Send />}
            onClick={() => handleWhatsApp(
              selectedRepair?.clientPhone,
              `Hola ${selectedRepair?.clientName}! Tu ${selectedRepair?.equipment.brand} ${selectedRepair?.equipment.model} está listo para recoger. Ticket: ${selectedRepair?.ticketNumber}`
            )}
          >
            WhatsApp
          </Button>
          <Button 
            variant="contained" 
            startIcon={<Edit />}
          >
            Actualizar Estado
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

      {/* FAB para agregar reparación */}
      <Fab
        color="primary"
        aria-label="add repair"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        onClick={handleAddRepair}
      >
        <Add />
      </Fab>
    </Container>
  );
}

export default Repairs;

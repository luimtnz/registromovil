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
  Block,
  Delete
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

  // Estados para nueva reparación
  const [addRepairDialogOpen, setAddRepairDialogOpen] = useState(false);
  const [newRepair, setNewRepair] = useState({
    clientName: '',
    clientPhone: '',
    clientEmail: '',
    equipmentBrand: '',
    equipmentModel: '',
    equipmentImei: '',
    equipmentColor: '',
    equipmentCapacity: '',
    issue: '',
    diagnosis: '',
    priority: 'media',
    technician: '',
    estimatedTime: '',
    cost: '',
    deposit: '',
    notes: '',
    beforePhotos: [],
    afterPhotos: [],
    warranty: '3 meses',
    warrantyNotes: ''
  });

  const handleAddRepair = () => {
    setAddRepairDialogOpen(true);
  };

  const handleSaveRepair = () => {
    if (!newRepair.clientName || !newRepair.equipmentBrand || !newRepair.issue) {
      setSnackbar({
        open: true,
        message: 'Por favor complete los campos obligatorios',
        severity: 'error'
      });
      return;
    }

    const repair = {
      id: repairs.length + 1,
      ticketNumber: `REP-${String(repairs.length + 1).padStart(3, '0')}`,
      ...newRepair,
      status: 'recibido',
      startDate: new Date().toISOString().split('T')[0],
      estimatedCompletion: newRepair.estimatedTime ? 
        new Date(Date.now() + parseInt(newRepair.estimatedTime) * 24 * 60 * 60 * 1000).toISOString().split('T')[0] : null,
      actualCompletion: null,
      balance: (parseFloat(newRepair.cost) || 0) - (parseFloat(newRepair.deposit) || 0),
      beforePhotos: newRepair.beforePhotos,
      afterPhotos: newRepair.afterPhotos,
      warranty: newRepair.warranty,
      warrantyNotes: newRepair.warrantyNotes,
      createdAt: new Date().toISOString()
    };

    // Agregar a la lista (en un sistema real, esto se haría con el DataContext)
    repairs.push(repair);
    
    setSnackbar({
      open: true,
      message: 'Reparación registrada exitosamente',
      severity: 'success'
    });

    // Limpiar formulario
    setNewRepair({
      clientName: '',
      clientPhone: '',
      clientEmail: '',
      equipmentBrand: '',
      equipmentModel: '',
      equipmentImei: '',
      equipmentColor: '',
      equipmentCapacity: '',
      issue: '',
      diagnosis: '',
      priority: 'media',
      technician: '',
      estimatedTime: '',
      cost: '',
      deposit: '',
      notes: '',
      beforePhotos: [],
      afterPhotos: [],
      warranty: '3 meses',
      warrantyNotes: ''
    });

    setAddRepairDialogOpen(false);
  };

  const handlePhotoUpload = (type, files) => {
    const photoArray = Array.from(files).map(file => ({
      id: Date.now() + Math.random(),
      url: URL.createObjectURL(file),
      name: file.name,
      size: file.size
    }));

    if (type === 'before') {
      setNewRepair(prev => ({
        ...prev,
        beforePhotos: [...prev.beforePhotos, ...photoArray]
      }));
    } else {
      setNewRepair(prev => ({
        ...prev,
        afterPhotos: [...prev.afterPhotos, ...photoArray]
      }));
    }
  };

  const handleRemovePhoto = (type, photoId) => {
    if (type === 'before') {
      setNewRepair(prev => ({
        ...prev,
        beforePhotos: prev.beforePhotos.filter(p => p.id !== photoId)
      }));
    } else {
      setNewRepair(prev => ({
        ...prev,
        afterPhotos: prev.afterPhotos.filter(p => p.id !== photoId)
      }));
    }
  };

  const handleSendWhatsApp = () => {
    const message = `🔧 *Nueva Reparación Registrada*

📱 *Equipo:* ${newRepair.equipmentBrand} ${newRepair.equipmentModel}
👤 *Cliente:* ${newRepair.clientName}
📞 *Teléfono:* ${newRepair.clientPhone}
❌ *Problema:* ${newRepair.issue}
💰 *Costo Estimado:* $${newRepair.cost || 'Por definir'}
⏰ *Tiempo Estimado:* ${newRepair.estimatedTime || 'Por definir'}
🔒 *Garantía:* ${newRepair.warranty}

_Reparación registrada exitosamente. Te mantendremos informado del progreso._`;

    const whatsappUrl = `https://wa.me/57${newRepair.clientPhone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
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

      {/* Dialog para nueva reparación */}
      <Dialog 
        open={addRepairDialogOpen} 
        onClose={() => setAddRepairDialogOpen(false)} 
        maxWidth="md" 
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Add color="primary" />
            Nueva Reparación
          </Box>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            {/* Información del Cliente */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{ borderBottom: 1, borderColor: 'divider', pb: 1 }}>
                👤 Información del Cliente
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Nombre del Cliente *"
                value={newRepair.clientName}
                onChange={(e) => setNewRepair({...newRepair, clientName: e.target.value})}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Teléfono"
                value={newRepair.clientPhone}
                onChange={(e) => setNewRepair({...newRepair, clientPhone: e.target.value})}
                placeholder="3001234567"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={newRepair.clientEmail}
                onChange={(e) => setNewRepair({...newRepair, clientEmail: e.target.value})}
              />
            </Grid>

            {/* Información del Equipo */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{ borderBottom: 1, borderColor: 'divider', pb: 1, mt: 2 }}>
                📱 Información del Equipo
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Marca *"
                value={newRepair.equipmentBrand}
                onChange={(e) => setNewRepair({...newRepair, equipmentBrand: e.target.value})}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Modelo *"
                value={newRepair.equipmentModel}
                onChange={(e) => setNewRepair({...newRepair, equipmentModel: e.target.value})}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="IMEI"
                value={newRepair.equipmentImei}
                onChange={(e) => setNewRepair({...newRepair, equipmentImei: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Color"
                value={newRepair.equipmentColor}
                onChange={(e) => setNewRepair({...newRepair, equipmentColor: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Capacidad"
                value={newRepair.equipmentCapacity}
                onChange={(e) => setNewRepair({...newRepair, equipmentCapacity: e.target.value})}
                placeholder="128GB, 256GB, etc."
              />
            </Grid>

            {/* Problema y Diagnóstico */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{ borderBottom: 1, borderColor: 'divider', pb: 1, mt: 2 }}>
                🔍 Problema y Diagnóstico
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Problema Reportado *"
                multiline
                rows={3}
                value={newRepair.issue}
                onChange={(e) => setNewRepair({...newRepair, issue: e.target.value})}
                required
                placeholder="Describe el problema que reporta el cliente..."
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Diagnóstico Técnico"
                multiline
                rows={3}
                value={newRepair.diagnosis}
                onChange={(e) => setNewRepair({...newRepair, diagnosis: e.target.value})}
                placeholder="Diagnóstico inicial del técnico..."
              />
            </Grid>

            {/* Configuración de Reparación */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{ borderBottom: 1, borderColor: 'divider', pb: 1, mt: 2 }}>
                ⚙️ Configuración de Reparación
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Prioridad</InputLabel>
                <Select
                  value={newRepair.priority}
                  label="Prioridad"
                  onChange={(e) => setNewRepair({...newRepair, priority: e.target.value})}
                >
                  <MenuItem value="baja">Baja</MenuItem>
                  <MenuItem value="media">Media</MenuItem>
                  <MenuItem value="alta">Alta</MenuItem>
                  <MenuItem value="urgente">Urgente</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Técnico Asignado"
                value={newRepair.technician}
                onChange={(e) => setNewRepair({...newRepair, technician: e.target.value})}
                placeholder="Nombre del técnico"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Tiempo Estimado (días)"
                type="number"
                value={newRepair.estimatedTime}
                onChange={(e) => setNewRepair({...newRepair, estimatedTime: e.target.value})}
                placeholder="3"
              />
            </Grid>

            {/* Información Financiera */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{ borderBottom: 1, borderColor: 'divider', pb: 1, mt: 2 }}>
                💰 Información Financiera
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Costo Estimado"
                type="number"
                value={newRepair.cost}
                onChange={(e) => setNewRepair({...newRepair, cost: e.target.value})}
                placeholder="250000"
                InputProps={{
                  startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Anticipo/Depósito"
                type="number"
                value={newRepair.deposit}
                onChange={(e) => setNewRepair({...newRepair, deposit: e.target.value})}
                placeholder="100000"
                InputProps={{
                  startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>
                }}
              />
            </Grid>

            {/* Fotos Antes */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{ borderBottom: 1, borderColor: 'divider', pb: 1, mt: 2 }}>
                📸 Fotos Antes de la Reparación
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="before-photos"
                multiple
                type="file"
                onChange={(e) => handlePhotoUpload('before', e.target.files)}
              />
              <label htmlFor="before-photos">
                <Button
                  variant="outlined"
                  component="span"
                  startIcon={<PhotoCamera />}
                >
                  Subir Fotos Antes
                </Button>
              </label>
              {newRepair.beforePhotos.length > 0 && (
                <ImageList cols={3} rowHeight={120} sx={{ mt: 2 }}>
                  {newRepair.beforePhotos.map((photo) => (
                    <ImageListItem key={photo.id}>
                      <img
                        src={photo.url}
                        alt={photo.name}
                        loading="lazy"
                      />
                      <ImageListItemBar
                        actionIcon={
                          <IconButton
                            size="small"
                            onClick={() => handleRemovePhoto('before', photo.id)}
                            sx={{ color: 'white' }}
                          >
                            <Delete />
                          </IconButton>
                        }
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              )}
            </Grid>

            {/* Garantía */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{ borderBottom: 1, borderColor: 'divider', pb: 1, mt: 2 }}>
                🔒 Garantía
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Período de Garantía</InputLabel>
                <Select
                  value={newRepair.warranty}
                  label="Período de Garantía"
                  onChange={(e) => setNewRepair({...newRepair, warranty: e.target.value})}
                >
                  <MenuItem value="1 mes">1 mes</MenuItem>
                  <MenuItem value="3 meses">3 meses</MenuItem>
                  <MenuItem value="6 meses">6 meses</MenuItem>
                  <MenuItem value="1 año">1 año</MenuItem>
                  <MenuItem value="Sin garantía">Sin garantía</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Notas de Garantía"
                value={newRepair.warrantyNotes}
                onChange={(e) => setNewRepair({...newRepair, warrantyNotes: e.target.value})}
                placeholder="Condiciones especiales de garantía..."
              />
            </Grid>

            {/* Notas Adicionales */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Notas Adicionales"
                multiline
                rows={3}
                value={newRepair.notes}
                onChange={(e) => setNewRepair({...newRepair, notes: e.target.value})}
                placeholder="Información adicional, observaciones, etc..."
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddRepairDialogOpen(false)}>
            Cancelar
          </Button>
          <Button 
            variant="outlined" 
            startIcon={<WhatsApp />}
            onClick={handleSendWhatsApp}
            disabled={!newRepair.clientPhone}
          >
            Enviar WhatsApp
          </Button>
          <Button 
            variant="contained" 
            onClick={handleSaveRepair}
            startIcon={<Add />}
          >
            Registrar Reparación
          </Button>
        </DialogActions>
      </Dialog>

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

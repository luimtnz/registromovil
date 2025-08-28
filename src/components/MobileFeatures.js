import React, { useState, useRef, useEffect } from 'react';
import {
  Container,
  Typography,
  Paper,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Divider,
  IconButton,
  Alert,
  Snackbar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment
} from '@mui/material';
import {
  QrCodeScanner,
  CameraAlt,
  PhotoCamera,
  LocationOn,
  MyLocation,
  Save,
  Delete,
  Upload,
  QrCode,
  Map,
  Phone
} from '@mui/icons-material';

function MobileFeatures() {
  const [activeFeature, setActiveFeature] = useState('scanner');
  const [scannedData, setScannedData] = useState('');
  const [scannedHistory, setScannedHistory] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [location, setLocation] = useState(null);
  const [locationHistory, setLocationHistory] = useState([]);
  const [equipmentData, setEquipmentData] = useState({
    imei: '',
    brand: '',
    model: '',
    type: 'venta',
    notes: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const fileInputRef = useRef(null);

  // Simular historial de escaneos
  useEffect(() => {
    const mockHistory = [
      {
        id: 1,
        data: '123456789012345',
        type: 'IMEI',
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
        equipment: { brand: 'Samsung', model: 'Galaxy S21' }
      },
      {
        id: 2,
        data: '987654321098765',
        type: 'IMEI',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
        equipment: { brand: 'iPhone', model: '13 Pro' }
      }
    ];
    setScannedHistory(mockHistory);

    // Simular fotos existentes
    const mockPhotos = [
      {
        id: 1,
        url: 'https://via.placeholder.com/300x200/2196F3/FFFFFF?text=Samsung+Galaxy+S21',
        equipment: 'Samsung Galaxy S21',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
        type: 'front'
      },
      {
        id: 2,
        url: 'https://via.placeholder.com/300x200/4CAF50/FFFFFF?text=iPhone+13+Pro',
        equipment: 'iPhone 13 Pro',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6),
        type: 'back'
      }
    ];
    setPhotos(mockPhotos);

    // Simular historial de ubicaciones
    const mockLocations = [
      {
        id: 1,
        address: 'Calle 123 #45-67, Bogotá',
        coordinates: { lat: 4.7110, lng: -74.0721 },
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
        equipment: 'Samsung Galaxy S21'
      }
    ];
    setLocationHistory(mockLocations);
  }, []);

  // Obtener ubicación actual
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
          
          // Simular dirección
          const mockAddress = 'Ubicación actual detectada';
          const newLocation = {
            id: Date.now(),
            address: mockAddress,
            coordinates: { lat: latitude, lng: longitude },
            timestamp: new Date(),
            equipment: equipmentData.imei ? `${equipmentData.brand} ${equipmentData.model}` : 'Sin equipo'
          };
          
          setLocationHistory(prev => [newLocation, ...prev]);
          setShowSuccess(true);
          setSuccessMessage('Ubicación capturada exitosamente');
        },
        (error) => {
          console.error('Error obteniendo ubicación:', error);
          setShowSuccess(true);
          setSuccessMessage('Error obteniendo ubicación. Verifica permisos de GPS.');
        }
      );
    } else {
      setShowSuccess(true);
      setSuccessMessage('Geolocalización no soportada en este dispositivo');
    }
  };

  // Simular escaneo QR/IMEI
  const simulateScan = () => {
    const mockData = [
      '123456789012345',
      '987654321098765',
      '555666777888999',
      '111222333444555'
    ];
    const randomData = mockData[Math.floor(Math.random() * mockData.length)];
    
    setScannedData(randomData);
    
    const newScan = {
      id: Date.now(),
      data: randomData,
      type: 'IMEI',
      timestamp: new Date(),
      equipment: { brand: 'Equipo Escaneado', model: 'Modelo Detectado' }
    };
    
    setScannedHistory(prev => [newScan, ...prev]);
    setShowSuccess(true);
    setSuccessMessage('Equipo escaneado exitosamente');
  };

  // Simular captura de foto
  const simulatePhotoCapture = () => {
    const mockPhoto = {
      id: Date.now(),
      url: `https://via.placeholder.com/300x200/${Math.floor(Math.random()*16777215).toString(16)}/FFFFFF?text=${equipmentData.imei || 'Equipo'}`,
      equipment: equipmentData.imei ? `${equipmentData.brand} ${equipmentData.model}` : 'Equipo sin registrar',
      timestamp: new Date(),
      type: 'front'
    };
    
    setPhotos(prev => [mockPhoto, ...prev]);
    setShowSuccess(true);
    setSuccessMessage('Foto capturada exitosamente');
  };

  // Manejar archivo de imagen
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const mockPhoto = {
          id: Date.now(),
          url: e.target.result,
          equipment: equipmentData.imei ? `${equipmentData.brand} ${equipmentData.model}` : 'Equipo sin registrar',
          timestamp: new Date(),
          type: 'uploaded'
        };
        
        setPhotos(prev => [mockPhoto, ...prev]);
        setShowSuccess(true);
        setSuccessMessage('Imagen subida exitosamente');
      };
      reader.readAsDataURL(file);
    }
  };

  // Guardar datos del equipo
  const handleSaveEquipment = () => {
    if (equipmentData.imei && equipmentData.brand && equipmentData.model) {
      setShowSuccess(true);
      setSuccessMessage('Datos del equipo guardados exitosamente');
      
      // Aquí se implementaría la lógica para guardar en la base de datos
      console.log('Equipo guardado:', equipmentData);
    } else {
      setShowSuccess(true);
      setSuccessMessage('Por favor, complete todos los campos obligatorios');
    }
  };

  // Eliminar foto
  const handleDeletePhoto = (photoId) => {
    setPhotos(prev => prev.filter(photo => photo.id !== photoId));
    setShowSuccess(true);
    setSuccessMessage('Foto eliminada exitosamente');
  };

  // Eliminar ubicación
  const handleDeleteLocation = (locationId) => {
    setLocationHistory(prev => prev.filter(loc => loc.id !== locationId));
    setShowSuccess(true);
        setSuccessMessage('Ubicación eliminada exitosamente');
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) return `Hace ${minutes} min`;
    if (hours < 24) return `Hace ${hours} horas`;
    return `Hace ${days} días`;
  };

  const getFeatureIcon = (feature) => {
    switch (feature) {
      case 'scanner': return <QrCodeScanner color="primary" />;
      case 'camera': return <CameraAlt color="success" />;
      case 'location': return <LocationOn color="warning" />;
      default: return <Phone color="action" />;
    }
  };

  const getFeatureTitle = (feature) => {
    switch (feature) {
      case 'scanner': return '📱 Escáner QR/IMEI';
      case 'camera': return '📸 Cámara de Equipos';
      case 'location': return '📍 Geolocalización';
      default: return '📱 Funcionalidades Móviles';
    }
  };

  return (
    <Container maxWidth="xl">
      <Paper elevation={3} sx={{ p: 4, mt: 3 }}>
        {/* Header */}
        <Typography variant="h4" component="h1" gutterBottom align="center">
          📱 Funcionalidades Móviles Avanzadas
        </Typography>
        <Typography variant="body1" color="textSecondary" align="center" sx={{ mb: 4 }}>
          Escáner QR, Cámara de Equipos y Geolocalización para Gestión Móvil
        </Typography>

        {/* Navegación de Funcionalidades */}
        <Box sx={{ mb: 4 }}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <Button
                variant={activeFeature === 'scanner' ? 'contained' : 'outlined'}
                startIcon={<QrCodeScanner />}
                onClick={() => setActiveFeature('scanner')}
                size="large"
              >
                Escáner
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant={activeFeature === 'camera' ? 'contained' : 'outlined'}
                startIcon={<CameraAlt />}
                onClick={() => setActiveFeature('camera')}
                size="large"
              >
                Cámara
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant={activeFeature === 'location' ? 'contained' : 'outlined'}
                startIcon={<LocationOn />}
                onClick={() => setActiveFeature('location')}
                size="large"
              >
                Ubicación
              </Button>
            </Grid>
          </Grid>
        </Box>

        {/* Funcionalidad de Escáner */}
        {activeFeature === 'scanner' && (
          <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              {getFeatureIcon('scanner')}
              <Typography variant="h5" sx={{ ml: 2 }}>
                {getFeatureTitle('scanner')}
              </Typography>
            </Box>
            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      🎯 Escáner Activo
                    </Typography>
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                      <QrCode sx={{ fontSize: 80, color: 'primary.main', mb: 2 }} />
                      <Typography variant="body1" color="textSecondary" gutterBottom>
                        Escanea códigos QR o IMEI de equipos
                      </Typography>
                      <Button
                        variant="contained"
                        startIcon={<QrCodeScanner />}
                        onClick={simulateScan}
                        size="large"
                        sx={{ mt: 2 }}
                      >
                        Simular Escaneo
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      📋 Datos del Equipo
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="IMEI Escaneado"
                          value={scannedData}
                          onChange={(e) => setScannedData(e.target.value)}
                          placeholder="123456789012345"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <QrCode />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Marca"
                          value={equipmentData.brand}
                          onChange={(e) => setEquipmentData(prev => ({ ...prev, brand: e.target.value }))}
                          placeholder="Samsung, iPhone, etc."
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Modelo"
                          value={equipmentData.model}
                          onChange={(e) => setEquipmentData(prev => ({ ...prev, model: e.target.value }))}
                          placeholder="Galaxy S21, iPhone 13, etc."
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormControl fullWidth>
                          <InputLabel>Tipo</InputLabel>
                          <Select
                            value={equipmentData.type}
                            onChange={(e) => setEquipmentData(prev => ({ ...prev, type: e.target.value }))}
                            label="Tipo"
                          >
                            <MenuItem value="venta">Venta</MenuItem>
                            <MenuItem value="reparacion">Reparación</MenuItem>
                            <MenuItem value="compra">Compra</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Notas"
                          value={equipmentData.notes}
                          onChange={(e) => setEquipmentData(prev => ({ ...prev, notes: e.target.value }))}
                          placeholder="Observaciones adicionales..."
                          multiline
                          rows={2}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          variant="contained"
                          startIcon={<Save />}
                          onClick={handleSaveEquipment}
                          fullWidth
                          color="primary"
                        >
                          Guardar Equipo
                        </Button>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {/* Historial de Escaneos */}
            <Paper elevation={1} sx={{ p: 3, mt: 3, bgcolor: 'grey.50' }}>
              <Typography variant="h6" gutterBottom>
                📚 Historial de Escaneos
              </Typography>
              <List>
                {scannedHistory.map((scan, index) => (
                  <React.Fragment key={scan.id}>
                    <ListItem>
                      <ListItemIcon>
                        <QrCode color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="body1" fontWeight="bold">
                              {scan.data}
                            </Typography>
                            <Chip label={scan.type} size="small" color="primary" />
                          </Box>
                        }
                        secondary={
                          <Box>
                            <Typography variant="body2" color="textSecondary">
                              {scan.equipment.brand} {scan.equipment.model}
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                              {formatTimeAgo(scan.timestamp)}
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                    {index < scannedHistory.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </Paper>
          </Paper>
        )}

        {/* Funcionalidad de Cámara */}
        {activeFeature === 'camera' && (
          <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              {getFeatureIcon('camera')}
              <Typography variant="h5" sx={{ ml: 2 }}>
                {getFeatureTitle('camera')}
              </Typography>
            </Box>
            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      📸 Captura de Fotos
                    </Typography>
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                      <CameraAlt sx={{ fontSize: 80, color: 'success.main', mb: 2 }} />
                      <Typography variant="body1" color="textSecondary" gutterBottom>
                        Captura fotos de equipos para el inventario
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 2 }}>
                        <Button
                          variant="contained"
                          startIcon={<PhotoCamera />}
                          onClick={simulatePhotoCapture}
                          color="success"
                        >
                          Capturar Foto
                        </Button>
                        <Button
                          variant="outlined"
                          startIcon={<Upload />}
                          onClick={() => fileInputRef.current?.click()}
                        >
                          Subir Imagen
                        </Button>
                      </Box>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        style={{ display: 'none' }}
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      📱 Información del Equipo
                    </Typography>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                      Asegúrate de que el equipo esté registrado antes de tomar fotos
                    </Typography>
                    <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1, mt: 2 }}>
                      <Typography variant="body2">
                        <strong>IMEI:</strong> {equipmentData.imei || 'No escaneado'}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Equipo:</strong> {equipmentData.brand} {equipmentData.model}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Tipo:</strong> {equipmentData.type}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {/* Galería de Fotos */}
            <Paper elevation={1} sx={{ p: 3, mt: 3, bgcolor: 'grey.50' }}>
              <Typography variant="h6" gutterBottom>
                🖼️ Galería de Fotos ({photos.length})
              </Typography>
              <Grid container spacing={2}>
                {photos.map((photo) => (
                  <Grid item xs={12} sm={6} md={4} key={photo.id}>
                    <Card>
                      <Box sx={{ position: 'relative' }}>
                        <img
                          src={photo.url}
                          alt={photo.equipment}
                          style={{ width: '100%', height: 200, objectFit: 'cover' }}
                        />
                        <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
                          <IconButton
                            size="small"
                            onClick={() => handleDeletePhoto(photo.id)}
                            sx={{ bgcolor: 'rgba(255,255,255,0.8)' }}
                          >
                            <Delete color="error" />
                          </IconButton>
                        </Box>
                      </Box>
                      <CardContent>
                        <Typography variant="body2" fontWeight="bold" gutterBottom>
                          {photo.equipment}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {formatTimeAgo(photo.timestamp)} • {photo.type}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Paper>
        )}

        {/* Funcionalidad de Geolocalización */}
        {activeFeature === 'location' && (
          <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              {getFeatureIcon('location')}
              <Typography variant="h5" sx={{ ml: 2 }}>
                {getFeatureTitle('location')}
              </Typography>
            </Box>
            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      📍 Captura de Ubicación
                    </Typography>
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                      <LocationOn sx={{ fontSize: 80, color: 'warning.main', mb: 2 }} />
                      <Typography variant="body1" color="textSecondary" gutterBottom>
                        Captura la ubicación actual o selecciona una ubicación
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 2 }}>
                        <Button
                          variant="contained"
                          startIcon={<MyLocation />}
                          onClick={getCurrentLocation}
                          color="warning"
                        >
                          Ubicación Actual
                        </Button>
                        <Button
                          variant="outlined"
                          startIcon={<Map />}
                          onClick={() => alert('Funcionalidad de selección de ubicación en desarrollo')}
                        >
                          Seleccionar
                        </Button>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      🗺️ Información de Ubicación
                    </Typography>
                    {location ? (
                      <Box sx={{ p: 2, bgcolor: 'success.light', borderRadius: 1 }}>
                        <Typography variant="body2" color="success.dark" gutterBottom>
                          <strong>Ubicación Capturada:</strong>
                        </Typography>
                        <Typography variant="body2" color="success.dark">
                          Latitud: {location.lat.toFixed(6)}
                        </Typography>
                        <Typography variant="body2" color="success.dark">
                          Longitud: {location.lng.toFixed(6)}
                        </Typography>
                        <Typography variant="body2" color="success.dark">
                          Equipo: {equipmentData.imei ? `${equipmentData.brand} ${equipmentData.model}` : 'Sin equipo'}
                        </Typography>
                      </Box>
                    ) : (
                      <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
                        <Typography variant="body2" color="textSecondary">
                          No se ha capturado ubicación
                        </Typography>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {/* Historial de Ubicaciones */}
            <Paper elevation={1} sx={{ p: 3, mt: 3, bgcolor: 'grey.50' }}>
              <Typography variant="h6" gutterBottom>
                📍 Historial de Ubicaciones ({locationHistory.length})
              </Typography>
              <List>
                {locationHistory.map((loc, index) => (
                  <React.Fragment key={loc.id}>
                    <ListItem>
                      <ListItemIcon>
                        <LocationOn color="warning" />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="body1" fontWeight="bold">
                              {loc.address}
                            </Typography>
                            <Chip label="GPS" size="small" color="warning" />
                          </Box>
                        }
                        secondary={
                          <Box>
                            <Typography variant="body2" color="textSecondary">
                              {loc.equipment}
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                              {formatTimeAgo(loc.timestamp)} • Lat: {loc.coordinates.lat.toFixed(4)}, Lng: {loc.coordinates.lng.toFixed(4)}
                            </Typography>
                          </Box>
                        }
                      />
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton
                          size="small"
                          onClick={() => handleDeleteLocation(loc.id)}
                          color="error"
                        >
                          <Delete />
                        </IconButton>
                      </Box>
                    </ListItem>
                    {index < locationHistory.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </Paper>
          </Paper>
        )}

        {/* Información del Sistema */}
        <Paper elevation={1} sx={{ p: 3, mt: 3, bgcolor: 'grey.50' }}>
          <Typography variant="h6" gutterBottom>
            ℹ️ Estado de Funcionalidades Móviles
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <Typography variant="body2" color="textSecondary">
                <strong>Escaneos:</strong> {scannedHistory.length}
              </Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="body2" color="textSecondary">
                <strong>Fotos:</strong> {photos.length}
              </Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="body2" color="textSecondary">
                <strong>Ubicaciones:</strong> {locationHistory.length}
              </Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="body2" color="textSecondary">
                <strong>Estado:</strong> 
                <Chip
                  label="Activo"
                  color="success"
                  size="small"
                  sx={{ ml: 1 }}
                />
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Paper>

      {/* Snackbar de notificaciones */}
      <Snackbar
        open={showSuccess}
        autoHideDuration={6000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setShowSuccess(false)} severity="success">
          {successMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default MobileFeatures;

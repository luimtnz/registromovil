import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Card,
  CardContent,
  Grid,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Chip,
  Alert,
  Snackbar,
  Fab,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  InputAdornment,
  Tooltip
} from '@mui/material';
import {
  Add,
  Delete,
  Visibility,
  TrendingUp,
  Inventory,
  Search,
  Assessment,
  MonetizationOn,
  Store,
  ShoppingCart
} from '@mui/icons-material';

const Accessories = () => {
  // Estados principales
  const [accessories, setAccessories] = useState([
    {
      id: 1,
      name: 'Funda Samsung Galaxy S23',
      category: 'Fundas',
      brand: 'Samsung',
      model: 'Galaxy S23',
      costPrice: 5000,
      salePrice: 12000,
      stock: 25,
      minStock: 5,
      color: 'Negro',
      description: 'Funda protectora de silicona',
      addedDate: '2024-01-15',
      supplier: 'Distribuidora Tech',
      location: 'Estante A1',
      barcode: '7891234567890',
      sold: 8
    },
    {
      id: 2,
      name: 'Protector Pantalla iPhone 14',
      category: 'Protectores',
      brand: 'Apple',
      model: 'iPhone 14',
      costPrice: 3000,
      salePrice: 8000,
      stock: 40,
      minStock: 10,
      color: 'Transparente',
      description: 'Vidrio templado 9H',
      addedDate: '2024-01-20',
      supplier: 'Glass Pro',
      location: 'Estante B2',
      barcode: '7891234567891',
      sold: 15
    },
    {
      id: 3,
      name: 'Cargador USB-C 20W',
      category: 'Cargadores',
      brand: 'Generic',
      model: 'Universal',
      costPrice: 8000,
      salePrice: 18000,
      stock: 15,
      minStock: 3,
      color: 'Blanco',
      description: 'Cargador rápido USB-C',
      addedDate: '2024-01-25',
      supplier: 'ElectroMóvil',
      location: 'Estante C3',
      barcode: '7891234567892',
      sold: 5
    },
    {
      id: 4,
      name: 'Auriculares Bluetooth',
      category: 'Auriculares',
      brand: 'Sony',
      model: 'WH-CH720N',
      costPrice: 45000,
      salePrice: 89000,
      stock: 8,
      minStock: 2,
      color: 'Negro',
      description: 'Auriculares inalámbricos con cancelación de ruido',
      addedDate: '2024-02-01',
      supplier: 'Audio Pro',
      location: 'Vitrina Principal',
      barcode: '7891234567893',
      sold: 3
    },
    {
      id: 5,
      name: 'Cable Lightning 1m',
      category: 'Cables',
      brand: 'Apple',
      model: 'Lightning',
      costPrice: 12000,
      salePrice: 25000,
      stock: 30,
      minStock: 8,
      color: 'Blanco',
      description: 'Cable original Apple Lightning',
      addedDate: '2024-02-05',
      supplier: 'Apple Store',
      location: 'Estante D1',
      barcode: '7891234567894',
      sold: 12
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [selectedAccessory, setSelectedAccessory] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [quickSaleDialogOpen, setQuickSaleDialogOpen] = useState(false);
  const [quickSaleAccessory, setQuickSaleAccessory] = useState(null);
  const [quickSaleQuantity, setQuickSaleQuantity] = useState(1);
  const [quickSaleClientName, setQuickSaleClientName] = useState('');
  const [quickSaleClientPhone, setQuickSaleClientPhone] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Nuevos accesorios para agregar
  const [newAccessory, setNewAccessory] = useState({
    name: '',
    category: '',
    brand: '',
    model: '',
    costPrice: '',
    salePrice: '',
    stock: '',
    minStock: '',
    color: '',
    description: '',
    supplier: '',
    location: '',
    barcode: ''
  });

  // Categorías disponibles
  const categories = ['Fundas', 'Protectores', 'Cargadores', 'Cables', 'Auriculares', 'Soportes', 'Limpieza', 'Otros'];

  // Filtrar accesorios
  const filteredAccessories = accessories.filter(accessory => {
    const matchesSearch = accessory.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         accessory.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         accessory.model.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === '' || accessory.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // Calcular métricas financieras
  const calculateMetrics = () => {
    const totalInvestment = accessories.reduce((sum, item) => sum + (item.costPrice * item.stock), 0);
    const totalInventoryValue = accessories.reduce((sum, item) => sum + (item.salePrice * item.stock), 0);
    const totalSold = accessories.reduce((sum, item) => sum + item.sold, 0);
    const totalRevenue = accessories.reduce((sum, item) => sum + (item.salePrice * item.sold), 0);
    const totalCostOfSold = accessories.reduce((sum, item) => sum + (item.costPrice * item.sold), 0);
    const totalProfit = totalRevenue - totalCostOfSold;
    const profitMargin = totalRevenue > 0 ? ((totalProfit / totalRevenue) * 100) : 0;
    const lowStockItems = accessories.filter(item => item.stock <= item.minStock).length;

    return {
      totalInvestment,
      totalInventoryValue,
      totalSold,
      totalRevenue,
      totalProfit,
      profitMargin,
      lowStockItems,
      totalItems: accessories.length,
      totalStock: accessories.reduce((sum, item) => sum + item.stock, 0)
    };
  };

  const metrics = calculateMetrics();

  // Funciones de manejo
  const handleAccessoryDetails = (accessory) => {
    setSelectedAccessory(accessory);
    setDialogOpen(true);
  };

  const handleAddAccessory = () => {
    if (!newAccessory.name || !newAccessory.costPrice || !newAccessory.salePrice || !newAccessory.stock) {
      setSnackbar({
        open: true,
        message: 'Por favor complete todos los campos obligatorios',
        severity: 'error'
      });
      return;
    }

    const accessory = {
      id: accessories.length + 1,
      ...newAccessory,
      costPrice: parseFloat(newAccessory.costPrice),
      salePrice: parseFloat(newAccessory.salePrice),
      stock: parseInt(newAccessory.stock),
      minStock: parseInt(newAccessory.minStock) || 1,
      addedDate: new Date().toISOString().split('T')[0],
      sold: 0
    };

    setAccessories([...accessories, accessory]);
    setNewAccessory({
      name: '',
      category: '',
      brand: '',
      model: '',
      costPrice: '',
      salePrice: '',
      stock: '',
      minStock: '',
      color: '',
      description: '',
      supplier: '',
      location: '',
      barcode: ''
    });
    setAddDialogOpen(false);
    setSnackbar({
      open: true,
      message: 'Accesorio agregado exitosamente',
      severity: 'success'
    });
  };

  const handleDeleteAccessory = (id) => {
    setAccessories(accessories.filter(item => item.id !== id));
    setSnackbar({
      open: true,
      message: 'Accesorio eliminado exitosamente',
      severity: 'success'
    });
  };

  const getStockColor = (stock, minStock) => {
    if (stock <= minStock) return 'error';
    if (stock <= minStock * 2) return 'warning';
    return 'success';
  };

  const getProfitMargin = (costPrice, salePrice) => {
    return ((salePrice - costPrice) / salePrice * 100).toFixed(1);
  };

  const handleQuickSale = (accessory) => {
    setQuickSaleAccessory(accessory);
    setQuickSaleQuantity(1);
    setQuickSaleClientName('');
    setQuickSaleClientPhone('');
    setQuickSaleDialogOpen(true);
  };

  const handleCompleteQuickSale = () => {
    if (!quickSaleClientName || !quickSaleClientPhone || quickSaleQuantity <= 0) {
      setSnackbar({
        open: true,
        message: 'Por favor complete todos los campos obligatorios',
        severity: 'error'
      });
      return;
    }

    if (quickSaleQuantity > quickSaleAccessory.stock) {
      setSnackbar({
        open: true,
        message: 'La cantidad excede el stock disponible',
        severity: 'error'
      });
      return;
    }

    // Actualizar stock y vendidos
    const updatedAccessories = accessories.map(item => 
      item.id === quickSaleAccessory.id 
        ? { 
            ...item, 
            stock: item.stock - quickSaleQuantity,
            sold: item.sold + quickSaleQuantity
          }
        : item
    );

    setAccessories(updatedAccessories);
    
    // Crear notificación de venta
    setSnackbar({
      open: true,
      message: `Venta rápida exitosa: ${quickSaleQuantity}x ${quickSaleAccessory.name}`,
      severity: 'success'
    });

    // Enviar WhatsApp si hay teléfono
    if (quickSaleClientPhone) {
      const message = `🛒 *Venta Rápida - ${quickSaleAccessory.name}*

📱 *Producto:* ${quickSaleAccessory.name}
🔢 *Cantidad:* ${quickSaleQuantity}
💰 *Precio Unitario:* $${quickSaleAccessory.salePrice.toLocaleString()}
💵 *Total:* $${(quickSaleAccessory.salePrice * quickSaleQuantity).toLocaleString()}
👤 *Cliente:* ${quickSaleClientName}
📅 *Fecha:* ${new Date().toLocaleDateString()}

¡Gracias por tu compra! 🎉`;

      const whatsappUrl = `https://wa.me/57${quickSaleClientPhone}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    }

    setQuickSaleDialogOpen(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" gutterBottom>
            <Store sx={{ mr: 2, verticalAlign: 'middle' }} />
            Gestión de Accesorios
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Administra tu inventario de accesorios con control financiero completo
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setAddDialogOpen(true)}
          sx={{ height: 'fit-content' }}
        >
          Agregar Accesorio
        </Button>
      </Box>

      {/* Métricas Financieras */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: 'primary.50', border: '1px solid', borderColor: 'primary.200' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h6" color="primary">
                    ${metrics.totalInvestment.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Inversión Total
                  </Typography>
                </Box>
                <MonetizationOn color="primary" sx={{ fontSize: 40 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: 'success.50', border: '1px solid', borderColor: 'success.200' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h6" color="success.main">
                    ${metrics.totalInventoryValue.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Valor Inventario
                  </Typography>
                </Box>
                <Inventory color="success" sx={{ fontSize: 40 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: 'warning.50', border: '1px solid', borderColor: 'warning.200' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h6" color="warning.main">
                    ${metrics.totalProfit.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Ganancia Total ({metrics.profitMargin.toFixed(1)}%)
                  </Typography>
                </Box>
                <TrendingUp color="warning" sx={{ fontSize: 40 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: 'info.50', border: '1px solid', borderColor: 'info.200' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h6" color="info.main">
                    {metrics.totalStock}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Stock Total ({metrics.totalItems} productos)
                  </Typography>
                </Box>
                <Assessment color="info" sx={{ fontSize: 40 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Alertas de Stock Bajo */}
      {metrics.lowStockItems > 0 && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          ⚠️ {metrics.lowStockItems} producto(s) con stock bajo. Revisa tu inventario.
        </Alert>
      )}

      {/* Filtros */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
        <TextField
          placeholder="Buscar por nombre, marca o modelo..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ minWidth: 300 }}
          InputProps={{
            startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />
          }}
        />
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Categoría</InputLabel>
          <Select
            value={filterCategory}
            label="Categoría"
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <MenuItem value="">Todas las categorías</MenuItem>
            {categories.map(category => (
              <MenuItem key={category} value={category}>{category}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Tabla de Accesorios */}
      <TableContainer component={Paper} elevation={2}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: 'grey.50' }}>
              <TableCell><strong>Producto</strong></TableCell>
              <TableCell><strong>Categoría</strong></TableCell>
              <TableCell><strong>Costo</strong></TableCell>
              <TableCell><strong>Precio Venta</strong></TableCell>
              <TableCell><strong>Margen</strong></TableCell>
              <TableCell><strong>Stock</strong></TableCell>
              <TableCell><strong>Vendidos</strong></TableCell>
              <TableCell><strong>Ganancia</strong></TableCell>
              <TableCell><strong>Acciones</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAccessories.map((accessory) => (
              <TableRow key={accessory.id} hover>
                <TableCell>
                  <Box>
                    <Typography variant="subtitle2">{accessory.name}</Typography>
                    <Typography variant="caption" color="textSecondary">
                      {accessory.brand} {accessory.model}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip label={accessory.category} size="small" variant="outlined" />
                </TableCell>
                <TableCell>${accessory.costPrice.toLocaleString()}</TableCell>
                <TableCell>${accessory.salePrice.toLocaleString()}</TableCell>
                <TableCell>
                  <Chip 
                    label={`${getProfitMargin(accessory.costPrice, accessory.salePrice)}%`}
                    color="success"
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Chip 
                    label={accessory.stock}
                    color={getStockColor(accessory.stock, accessory.minStock)}
                    size="small"
                  />
                </TableCell>
                <TableCell>{accessory.sold}</TableCell>
                <TableCell>
                  <Typography color="success.main" fontWeight="bold">
                    ${((accessory.salePrice - accessory.costPrice) * accessory.sold).toLocaleString()}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Tooltip title="Venta Rápida">
                      <IconButton 
                        size="small" 
                        color="success" 
                        onClick={() => handleQuickSale(accessory)}
                        disabled={accessory.stock <= 0}
                      >
                        <ShoppingCart />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Ver detalles">
                      <IconButton 
                        size="small" 
                        onClick={() => handleAccessoryDetails(accessory)}
                        color="primary"
                      >
                        <Visibility />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Eliminar">
                      <IconButton 
                        size="small" 
                        onClick={() => handleDeleteAccessory(accessory.id)}
                        color="error"
                      >
                        <Delete />
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
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            📊 Resumen de Inventario
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Typography variant="body2" color="textSecondary">
                Total de productos: <strong>{filteredAccessories.length}</strong>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="body2" color="textSecondary">
                Inversión mostrada: <strong>${filteredAccessories.reduce((sum, item) => sum + (item.costPrice * item.stock), 0).toLocaleString()}</strong>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="body2" color="textSecondary">
                Valor potencial: <strong>${filteredAccessories.reduce((sum, item) => sum + (item.salePrice * item.stock), 0).toLocaleString()}</strong>
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Dialog para ver detalles del accesorio */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Visibility color="primary" />
            Detalles del Accesorio
          </Box>
        </DialogTitle>
        <DialogContent>
          {selectedAccessory && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>{selectedAccessory.name}</Typography>
                <Typography variant="body2" color="textSecondary" paragraph>
                  {selectedAccessory.description}
                </Typography>
                
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2">Información Básica:</Typography>
                  <Typography variant="body2">Marca: {selectedAccessory.brand}</Typography>
                  <Typography variant="body2">Modelo: {selectedAccessory.model}</Typography>
                  <Typography variant="body2">Color: {selectedAccessory.color}</Typography>
                  <Typography variant="body2">Categoría: {selectedAccessory.category}</Typography>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2">Ubicación e Inventario:</Typography>
                  <Typography variant="body2">Ubicación: {selectedAccessory.location}</Typography>
                  <Typography variant="body2">Código de barras: {selectedAccessory.barcode}</Typography>
                  <Typography variant="body2">Proveedor: {selectedAccessory.supplier}</Typography>
                  <Typography variant="body2">Fecha agregado: {selectedAccessory.addedDate}</Typography>
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2">Información Financiera:</Typography>
                  <Typography variant="body2">Precio de costo: ${selectedAccessory.costPrice.toLocaleString()}</Typography>
                  <Typography variant="body2">Precio de venta: ${selectedAccessory.salePrice.toLocaleString()}</Typography>
                  <Typography variant="body2">Margen de ganancia: {getProfitMargin(selectedAccessory.costPrice, selectedAccessory.salePrice)}%</Typography>
                  <Typography variant="body2">Ganancia por unidad: ${(selectedAccessory.salePrice - selectedAccessory.costPrice).toLocaleString()}</Typography>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2">Stock y Ventas:</Typography>
                  <Typography variant="body2">Stock actual: {selectedAccessory.stock}</Typography>
                  <Typography variant="body2">Stock mínimo: {selectedAccessory.minStock}</Typography>
                  <Typography variant="body2">Unidades vendidas: {selectedAccessory.sold}</Typography>
                  <Typography variant="body2">Ganancia total: ${((selectedAccessory.salePrice - selectedAccessory.costPrice) * selectedAccessory.sold).toLocaleString()}</Typography>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2">Valor del Inventario:</Typography>
                  <Typography variant="body2">Inversión en stock: ${(selectedAccessory.costPrice * selectedAccessory.stock).toLocaleString()}</Typography>
                  <Typography variant="body2">Valor potencial: ${(selectedAccessory.salePrice * selectedAccessory.stock).toLocaleString()}</Typography>
                </Box>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cerrar</Button>
        </DialogActions>
      </Dialog>

      {/* Dialog para agregar nuevo accesorio */}
      <Dialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Add color="primary" />
            Agregar Nuevo Accesorio
          </Box>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Nombre del producto"
                value={newAccessory.name}
                onChange={(e) => setNewAccessory({...newAccessory, name: e.target.value})}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>Categoría</InputLabel>
                <Select
                  value={newAccessory.category}
                  label="Categoría"
                  onChange={(e) => setNewAccessory({...newAccessory, category: e.target.value})}
                >
                  {categories.map(category => (
                    <MenuItem key={category} value={category}>{category}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Marca"
                value={newAccessory.brand}
                onChange={(e) => setNewAccessory({...newAccessory, brand: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Modelo"
                value={newAccessory.model}
                onChange={(e) => setNewAccessory({...newAccessory, model: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Precio de costo"
                type="number"
                value={newAccessory.costPrice}
                onChange={(e) => setNewAccessory({...newAccessory, costPrice: e.target.value})}
                required
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Precio de venta"
                type="number"
                value={newAccessory.salePrice}
                onChange={(e) => setNewAccessory({...newAccessory, salePrice: e.target.value})}
                required
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Stock inicial"
                type="number"
                value={newAccessory.stock}
                onChange={(e) => setNewAccessory({...newAccessory, stock: e.target.value})}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Stock mínimo"
                type="number"
                value={newAccessory.minStock}
                onChange={(e) => setNewAccessory({...newAccessory, minStock: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Color"
                value={newAccessory.color}
                onChange={(e) => setNewAccessory({...newAccessory, color: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Ubicación"
                value={newAccessory.location}
                onChange={(e) => setNewAccessory({...newAccessory, location: e.target.value})}
                placeholder="Ej: Estante A1"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Proveedor"
                value={newAccessory.supplier}
                onChange={(e) => setNewAccessory({...newAccessory, supplier: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Código de barras"
                value={newAccessory.barcode}
                onChange={(e) => setNewAccessory({...newAccessory, barcode: e.target.value})}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Descripción"
                multiline
                rows={3}
                value={newAccessory.description}
                onChange={(e) => setNewAccessory({...newAccessory, description: e.target.value})}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddDialogOpen(false)}>Cancelar</Button>
          <Button onClick={handleAddAccessory} variant="contained">
            Agregar Accesorio
          </Button>
        </DialogActions>
      </Dialog>

      {/* FAB para agregar */}
      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        onClick={() => setAddDialogOpen(true)}
      >
        <Add />
      </Fab>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
        {/* Dialog de Venta Rápida */}
        <Dialog 
          open={quickSaleDialogOpen} 
          onClose={() => setQuickSaleDialogOpen(false)} 
          maxWidth="sm" 
          fullWidth
        >
          <DialogTitle>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <ShoppingCart color="success" />
              Venta Rápida - {quickSaleAccessory?.name}
            </Box>
          </DialogTitle>
          <DialogContent>
            {quickSaleAccessory && (
              <Grid container spacing={3} sx={{ mt: 1 }}>
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>
                    📱 {quickSaleAccessory.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    {quickSaleAccessory.brand} • {quickSaleAccessory.category}
                  </Typography>
                  <Typography variant="h6" color="success.main">
                    Precio: ${quickSaleAccessory.salePrice.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Stock disponible: {quickSaleAccessory.stock} unidades
                  </Typography>
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Nombre del Cliente *"
                    value={quickSaleClientName}
                    onChange={(e) => setQuickSaleClientName(e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Teléfono del Cliente *"
                    value={quickSaleClientPhone}
                    onChange={(e) => setQuickSaleClientPhone(e.target.value)}
                    required
                    placeholder="3001234567"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Cantidad *"
                    type="number"
                    value={quickSaleQuantity}
                    onChange={(e) => setQuickSaleQuantity(parseInt(e.target.value) || 1)}
                    required
                    inputProps={{ min: 1, max: quickSaleAccessory.stock }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box sx={{ p: 2, bgcolor: 'success.50', borderRadius: 1, border: '1px solid', borderColor: 'success.200' }}>
                    <Typography variant="h6" color="success.main" gutterBottom>
                      Total a Cobrar
                    </Typography>
                    <Typography variant="h4" color="success.main" fontWeight="bold">
                      ${(quickSaleAccessory.salePrice * quickSaleQuantity).toLocaleString()}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setQuickSaleDialogOpen(false)}>
              Cancelar
            </Button>
            <Button 
              variant="contained" 
              color="success"
              onClick={handleCompleteQuickSale}
              startIcon={<ShoppingCart />}
            >
              Completar Venta
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    );
  }

export default Accessories;

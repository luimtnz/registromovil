import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData debe ser usado dentro de un DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const { license, hasFeature } = useAuth();
  
  // Estados para diferentes tipos de datos
  const [equipment, setEquipment] = useState([]);
  const [clients, setClients] = useState([]);
  const [sales, setSales] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [repairs, setRepairs] = useState([]);
  const [accessories, setAccessories] = useState([]);
  const [notifications, setNotifications] = useState([]);
  
  const [error, setError] = useState(null);

  // Cargar datos desde localStorage al iniciar
  useEffect(() => {
    loadDataFromStorage();
  }, []);

  // Verificar límites de licencia
  const checkLicenseLimits = useCallback(() => {
    if (license && equipment.length >= license.maxEquipment) {
      setError(`Límite de equipos alcanzado (${license.maxEquipment}). Considere actualizar su licencia.`);
    } else {
      setError(null);
    }
  }, [license, equipment.length]);

  useEffect(() => {
    if (license) {
      checkLicenseLimits();
    }
  }, [license, equipment.length, checkLicenseLimits]);

  const loadDataFromStorage = () => {
    try {
      const savedEquipment = localStorage.getItem('registroMovil_equipment');
      const savedClients = localStorage.getItem('registroMovil_clients');
      const savedSales = localStorage.getItem('registroMovil_sales');
      const savedPurchases = localStorage.getItem('registroMovil_purchases');
      const savedRepairs = localStorage.getItem('registroMovil_repairs');
      const savedAccessories = localStorage.getItem('registroMovil_accessories');
      const savedNotifications = localStorage.getItem('registroMovil_notifications');

      if (savedEquipment) setEquipment(JSON.parse(savedEquipment));
      if (savedClients) setClients(JSON.parse(savedClients));
      if (savedSales) setSales(JSON.parse(savedSales));
      if (savedPurchases) setPurchases(JSON.parse(savedPurchases));
      if (savedRepairs) setRepairs(JSON.parse(savedRepairs));
      if (savedAccessories) setAccessories(JSON.parse(savedAccessories));
      if (savedNotifications) setNotifications(JSON.parse(savedNotifications));
    } catch (error) {
      console.error('Error cargando datos:', error);
      setError('Error cargando datos guardados');
    }
  };

  const saveDataToStorage = (key, data) => {
    try {
      localStorage.setItem(`registroMovil_${key}`, JSON.stringify(data));
    } catch (error) {
      console.error(`Error guardando ${key}:`, error);
      setError(`Error guardando ${key}`);
    }
  };

  // Funciones para equipos
  const addEquipment = (newEquipment) => {
    try {
      if (license && equipment.length >= license.maxEquipment) {
        throw new Error(`Límite de equipos alcanzado (${license.maxEquipment})`);
      }

      const equipmentWithId = {
        ...newEquipment,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      const updatedEquipment = [...equipment, equipmentWithId];
      setEquipment(updatedEquipment);
      saveDataToStorage('equipment', updatedEquipment);

      // Crear notificación
      addNotification({
        type: 'success',
        title: 'Equipo Registrado',
        message: `Se registró exitosamente el ${newEquipment.brand} ${newEquipment.model}`,
        timestamp: new Date().toISOString()
      });

      return { success: true, equipment: equipmentWithId };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    }
  };

  const updateEquipment = (id, updates) => {
    try {
      const updatedEquipment = equipment.map(item => 
        item.id === id 
          ? { ...item, ...updates, updatedAt: new Date().toISOString() }
          : item
      );
      
      setEquipment(updatedEquipment);
      saveDataToStorage('equipment', updatedEquipment);

      addNotification({
        type: 'info',
        title: 'Equipo Actualizado',
        message: `Se actualizó el equipo ${updates.brand || 'N/A'} ${updates.model || 'N/A'}`,
        timestamp: new Date().toISOString()
      });

      return { success: true };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    }
  };

  const deleteEquipment = (id) => {
    try {
      const equipmentToDelete = equipment.find(item => item.id === id);
      const updatedEquipment = equipment.filter(item => item.id !== id);
      
      setEquipment(updatedEquipment);
      saveDataToStorage('equipment', updatedEquipment);

      addNotification({
        type: 'warning',
        title: 'Equipo Eliminado',
        message: `Se eliminó el equipo ${equipmentToDelete?.brand || 'N/A'} ${equipmentToDelete?.model || 'N/A'}`,
        timestamp: new Date().toISOString()
      });

      return { success: true };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    }
  };

  // Funciones para clientes
  const addClient = (newClient) => {
    try {
      const clientWithId = {
        ...newClient,
        id: Date.now(),
        createdAt: new Date().toISOString()
      };

      const updatedClients = [...clients, clientWithId];
      setClients(updatedClients);
      saveDataToStorage('clients', updatedClients);

      return { success: true, client: clientWithId };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    }
  };

  const updateClient = (id, updates) => {
    try {
      const updatedClients = clients.map(client => 
        client.id === id 
          ? { ...client, ...updates, updatedAt: new Date().toISOString() }
          : client
      );
      
      setClients(updatedClients);
      saveDataToStorage('clients', updatedClients);

      return { success: true };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    }
  };

  // Funciones para ventas
  const addSale = (saleData) => {
    try {
      const saleWithId = {
        ...saleData,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        status: 'completada'
      };

      const updatedSales = [...sales, saleWithId];
      setSales(updatedSales);
      saveDataToStorage('sales', updatedSales);

      // Actualizar estado del equipo
      if (saleData.equipmentId) {
        updateEquipment(saleData.equipmentId, { status: 'vendido' });
      }

      addNotification({
        type: 'success',
        title: 'Venta Registrada',
        message: `Venta de ${saleData.brand} ${saleData.model} por $${saleData.price}`,
        timestamp: new Date().toISOString()
      });

      return { success: true, sale: saleWithId };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    }
  };

  // Funciones para compras
  const addPurchase = (purchaseData) => {
    try {
      const purchaseWithId = {
        ...purchaseData,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        status: 'completada'
      };

      const updatedPurchases = [...purchases, purchaseWithId];
      setPurchases(updatedPurchases);
      saveDataToStorage('purchases', updatedPurchases);

      addNotification({
        type: 'success',
        title: 'Compra Registrada',
        message: `Compra de ${purchaseData.brand} ${purchaseData.model} por $${purchaseData.price}`,
        timestamp: new Date().toISOString()
      });

      return { success: true, purchase: purchaseWithId };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    }
  };

  // Funciones para reparaciones
  const addRepair = (repairData) => {
    try {
      const repairWithId = {
        ...repairData,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        status: 'en_reparacion'
      };

      const updatedRepairs = [...repairs, repairWithId];
      setRepairs(updatedRepairs);
      saveDataToStorage('repairs', updatedRepairs);

      addNotification({
        type: 'info',
        title: 'Reparación Registrada',
        message: `Reparación de ${repairData.brand} ${repairData.model} registrada`,
        timestamp: new Date().toISOString()
      });

      return { success: true, repair: repairWithId };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    }
  };

  const updateRepairStatus = (id, status) => {
    try {
      const updatedRepairs = repairs.map(repair => 
        repair.id === id 
          ? { ...repair, status, updatedAt: new Date().toISOString() }
          : repair
      );
      
      setRepairs(updatedRepairs);
      saveDataToStorage('repairs', updatedRepairs);

      const repair = repairs.find(r => r.id === id);
      addNotification({
        type: 'info',
        title: 'Estado de Reparación Actualizado',
        message: `Reparación de ${repair?.brand} ${repair?.model} ahora está ${status}`,
        timestamp: new Date().toISOString()
      });

      return { success: true };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    }
  };

  // Funciones para notificaciones
  const addNotification = (notification) => {
    try {
      const notificationWithId = {
        ...notification,
        id: Date.now(),
        read: false
      };

      const updatedNotifications = [notificationWithId, ...notifications];
      setNotifications(updatedNotifications);
      saveDataToStorage('notifications', updatedNotifications);
    } catch (error) {
      console.error('Error agregando notificación:', error);
    }
  };

  const markNotificationAsRead = (id) => {
    try {
      const updatedNotifications = notifications.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      );
      
      setNotifications(updatedNotifications);
      saveDataToStorage('notifications', updatedNotifications);
    } catch (error) {
      console.error('Error marcando notificación:', error);
    }
  };

  const clearNotifications = () => {
    try {
      setNotifications([]);
      saveDataToStorage('notifications', []);
    } catch (error) {
      console.error('Error limpiando notificaciones:', error);
    }
  };

  // Funciones de búsqueda y filtrado
  const searchEquipment = (query) => {
    if (!query) return equipment;
    
    return equipment.filter(item => 
      item.imei1?.toLowerCase().includes(query.toLowerCase()) ||
      item.imei2?.toLowerCase().includes(query.toLowerCase()) ||
      item.brand?.toLowerCase().includes(query.toLowerCase()) ||
      item.model?.toLowerCase().includes(query.toLowerCase()) ||
      item.clientName?.toLowerCase().includes(query.toLowerCase())
    );
  };

  const getEquipmentByType = (type) => {
    return equipment.filter(item => item.type === type);
  };

  const getEquipmentByStatus = (status) => {
    return equipment.filter(item => item.status === status);
  };

  // Funciones para accesorios
  const addAccessory = (newAccessory) => {
    try {
      const accessoryWithId = {
        ...newAccessory,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        sold: 0
      };

      const updatedAccessories = [...accessories, accessoryWithId];
      setAccessories(updatedAccessories);
      saveDataToStorage('accessories', updatedAccessories);

      // Crear notificación
      addNotification({
        type: 'success',
        title: 'Accesorio Agregado',
        message: `Se agregó exitosamente ${newAccessory.name}`,
        timestamp: new Date().toISOString()
      });

      return { success: true, accessory: accessoryWithId };
    } catch (error) {
      console.error('Error agregando accesorio:', error);
      setError(error.message);
      return { success: false, error: error.message };
    }
  };

  const updateAccessory = (id, updates) => {
    try {
      const updatedAccessories = accessories.map(accessory =>
        accessory.id === id 
          ? { ...accessory, ...updates, updatedAt: new Date().toISOString() }
          : accessory
      );

      setAccessories(updatedAccessories);
      saveDataToStorage('accessories', updatedAccessories);

      return { success: true };
    } catch (error) {
      console.error('Error actualizando accesorio:', error);
      setError(error.message);
      return { success: false, error: error.message };
    }
  };

  const deleteAccessory = (id) => {
    try {
      const updatedAccessories = accessories.filter(accessory => accessory.id !== id);
      setAccessories(updatedAccessories);
      saveDataToStorage('accessories', updatedAccessories);

      addNotification({
        type: 'info',
        title: 'Accesorio Eliminado',
        message: 'El accesorio fue eliminado exitosamente',
        timestamp: new Date().toISOString()
      });

      return { success: true };
    } catch (error) {
      console.error('Error eliminando accesorio:', error);
      setError(error.message);
      return { success: false, error: error.message };
    }
  };

  const getAccessoryMetrics = () => {
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

  // Estadísticas
  const getStats = () => {
    const totalEquipment = equipment.length;
    const totalSales = sales.length;
    const totalPurchases = purchases.length;
    const totalRepairs = repairs.length;
    const inRepair = repairs.filter(r => r.status === 'en_reparacion').length;
    const pending = repairs.filter(r => r.status === 'pendiente').length;
    const delivered = repairs.filter(r => r.status === 'entregado').length;
    const inInventory = equipment.filter(e => e.status === 'en_inventario').length;

    // Métricas de accesorios
    const accessoryMetrics = getAccessoryMetrics();

    return {
      totalEquipment,
      totalSales,
      totalPurchases,
      totalRepairs,
      inRepair,
      pending,
      delivered,
      inInventory,
      accessories: accessoryMetrics
    };
  };

  // Exportar datos (solo para licencias que lo permitan)
  const exportData = (format = 'json') => {
    if (!hasFeature('export')) {
      throw new Error('Función de exportación no disponible en su licencia');
    }

    const data = {
      equipment,
      clients,
      sales,
      purchases,
      repairs,
      exportDate: new Date().toISOString(),
      license: license?.key
    };

    if (format === 'json') {
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `registro_movil_${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
    }

    return { success: true, data };
  };

  const clearError = () => setError(null);

  const value = {
    // Estados
    equipment,
    clients,
    sales,
    purchases,
    repairs,
    accessories,
    notifications,
    error,
    
    // Funciones de equipos
    addEquipment,
    updateEquipment,
    deleteEquipment,
    searchEquipment,
    getEquipmentByType,
    getEquipmentByStatus,
    
    // Funciones de clientes
    addClient,
    updateClient,
    
    // Funciones de ventas
    addSale,
    
    // Funciones de compras
    addPurchase,
    
    // Funciones de reparaciones
    addRepair,
    updateRepairStatus,
    
    // Funciones de accesorios
    addAccessory,
    updateAccessory,
    deleteAccessory,
    getAccessoryMetrics,
    
    // Funciones de notificaciones
    addNotification,
    markNotificationAsRead,
    clearNotifications,
    
    // Utilidades
    getStats,
    exportData,
    clearError
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};

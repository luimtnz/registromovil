import { buildApiUrl, getAuthHeaders } from '../config/api';

class ApiService {
  constructor() {
    this.baseUrl = buildApiUrl('');
    this.syncQueue = [];
    this.isOnline = navigator.onLine;
    this.setupEventListeners();
  }

  setupEventListeners() {
    window.addEventListener('online', () => {
      this.isOnline = true;
      this.processSyncQueue();
    });
    
    window.addEventListener('offline', () => {
      this.isOnline = false;
    });
  }

  // Método para hacer peticiones con manejo de errores y reintentos
  async makeRequest(endpoint, options = {}) {
    const { retries = 3, delay = 1000 } = options;
    
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        const response = await fetch(endpoint, {
          ...options,
          headers: {
            'Content-Type': 'application/json',
            ...options.headers
          }
        });

        if (response.ok) {
          return await response.json();
        }

        // Si es error 401, no reintentar
        if (response.status === 401) {
          throw new Error('No autorizado');
        }

        // Si es el último intento, lanzar error
        if (attempt === retries) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        // Esperar antes del siguiente intento
        await new Promise(resolve => setTimeout(resolve, delay * attempt));
      } catch (error) {
        if (attempt === retries) {
          throw error;
        }
        await new Promise(resolve => setTimeout(resolve, delay * attempt));
      }
    }
  }

  // Método para peticiones autenticadas
  async makeAuthenticatedRequest(endpoint, options = {}, token) {
    if (!token) {
      throw new Error('Token de autenticación requerido');
    }

    return this.makeRequest(endpoint, {
      ...options,
      headers: {
        ...getAuthHeaders(token),
        ...options.headers
      }
    });
  }

  // === EQUIPOS ===
  async getEquipment(token, userId) {
    try {
      const response = await this.makeAuthenticatedRequest(
        `${this.baseUrl}/api/v1/equipment?user_id=${userId}`,
        { method: 'GET' },
        token
      );
      return response;
    } catch (error) {
      console.error('Error obteniendo equipos:', error);
      throw error;
    }
  }

  async saveEquipment(equipment, token, userId) {
    try {
      const response = await this.makeAuthenticatedRequest(
        `${this.baseUrl}/api/v1/equipment`,
        {
          method: 'POST',
          body: JSON.stringify({
            ...equipment,
            user_id: userId
          })
        },
        token
      );
      return response;
    } catch (error) {
      console.error('Error guardando equipo:', error);
      throw error;
    }
  }

  async updateEquipment(id, equipment, token, userId) {
    try {
      const response = await this.makeAuthenticatedRequest(
        `${this.baseUrl}/api/v1/equipment/${id}`,
        {
          method: 'PUT',
          body: JSON.stringify({
            ...equipment,
            user_id: userId
          })
        },
        token
      );
      return response;
    } catch (error) {
      console.error('Error actualizando equipo:', error);
      throw error;
    }
  }

  async deleteEquipment(id, token, userId) {
    try {
      const response = await this.makeAuthenticatedRequest(
        `${this.baseUrl}/api/v1/equipment/${id}?user_id=${userId}`,
        { method: 'DELETE' },
        token
      );
      return response;
    } catch (error) {
      console.error('Error eliminando equipo:', error);
      throw error;
    }
  }

  // === CLIENTES ===
  async getClients(token, userId) {
    try {
      const response = await this.makeAuthenticatedRequest(
        `${this.baseUrl}/api/v1/clients?user_id=${userId}`,
        { method: 'GET' },
        token
      );
      return response;
    } catch (error) {
      console.error('Error obteniendo clientes:', error);
      throw error;
    }
  }

  async saveClient(client, token, userId) {
    try {
      const response = await this.makeAuthenticatedRequest(
        `${this.baseUrl}/api/v1/clients`,
        {
          method: 'POST',
          body: JSON.stringify({
            ...client,
            user_id: userId
          })
        },
        token
      );
      return response;
    } catch (error) {
      console.error('Error guardando cliente:', error);
      throw error;
    }
  }

  async updateClient(id, client, token, userId) {
    try {
      const response = await this.makeAuthenticatedRequest(
        `${this.baseUrl}/api/v1/clients/${id}`,
        {
          method: 'PUT',
          body: JSON.stringify({
            ...client,
            user_id: userId
          })
        },
        token
      );
      return response;
    } catch (error) {
      console.error('Error actualizando cliente:', error);
      throw error;
    }
  }

  // === VENTAS ===
  async getSales(token, userId) {
    try {
      const response = await this.makeAuthenticatedRequest(
        `${this.baseUrl}/api/v1/sales?user_id=${userId}`,
        { method: 'GET' },
        token
      );
      return response;
    } catch (error) {
      console.error('Error obteniendo ventas:', error);
      throw error;
    }
  }

  async saveSale(sale, token, userId) {
    try {
      const response = await this.makeAuthenticatedRequest(
        `${this.baseUrl}/api/v1/sales`,
        {
          method: 'POST',
          body: JSON.stringify({
            ...sale,
            user_id: userId
          })
        },
        token
      );
      return response;
    } catch (error) {
      console.error('Error guardando venta:', error);
      throw error;
    }
  }

  // === COMPRAS ===
  async getPurchases(token, userId) {
    try {
      const response = await this.makeAuthenticatedRequest(
        `${this.baseUrl}/api/v1/purchases?user_id=${userId}`,
        { method: 'GET' },
        token
      );
      return response;
    } catch (error) {
      console.error('Error obteniendo compras:', error);
      throw error;
    }
  }

  async savePurchase(purchase, token, userId) {
    try {
      const response = await this.makeAuthenticatedRequest(
        `${this.baseUrl}/api/v1/purchases`,
        {
          method: 'POST',
          body: JSON.stringify({
            ...purchase,
            user_id: userId
          })
        },
        token
      );
      return response;
    } catch (error) {
      console.error('Error guardando compra:', error);
      throw error;
    }
  }

  // === REPARACIONES ===
  async getRepairs(token, userId) {
    try {
      const response = await this.makeAuthenticatedRequest(
        `${this.baseUrl}/api/v1/repairs?user_id=${userId}`,
        { method: 'GET' },
        token
      );
      return response;
    } catch (error) {
      console.error('Error obteniendo reparaciones:', error);
      throw error;
    }
  }

  async saveRepair(repair, token, userId) {
    try {
      const response = await this.makeAuthenticatedRequest(
        `${this.baseUrl}/api/v1/repairs`,
        {
          method: 'POST',
          body: JSON.stringify({
            ...repair,
            user_id: userId
          })
        },
        token
      );
      return response;
    } catch (error) {
      console.error('Error guardando reparación:', error);
      throw error;
    }
  }

  async updateRepair(id, repair, token, userId) {
    try {
      const response = await this.makeAuthenticatedRequest(
        `${this.baseUrl}/api/v1/repairs/${id}`,
        {
          method: 'PUT',
          body: JSON.stringify({
            ...repair,
            user_id: userId
          })
        },
        token
      );
      return response;
    } catch (error) {
      console.error('Error actualizando reparación:', error);
      throw error;
    }
  }

  // === ACCESORIOS ===
  async getAccessories(token, userId) {
    try {
      const response = await this.makeAuthenticatedRequest(
        `${this.baseUrl}/api/v1/accessories?user_id=${userId}`,
        { method: 'GET' },
        token
      );
      return response;
    } catch (error) {
      console.error('Error obteniendo accesorios:', error);
      throw error;
    }
  }

  async saveAccessory(accessory, token, userId) {
    try {
      const response = await this.makeAuthenticatedRequest(
        `${this.baseUrl}/api/v1/accessories`,
        {
          method: 'POST',
          body: JSON.stringify({
            ...accessory,
            user_id: userId
          })
        },
        token
      );
      return response;
    } catch (error) {
      console.error('Error guardando accesorio:', error);
      throw error;
    }
  }

  async updateAccessory(id, accessory, token, userId) {
    try {
      const response = await this.makeAuthenticatedRequest(
        `${this.baseUrl}/api/v1/accessories/${id}`,
        {
          method: 'PUT',
          body: JSON.stringify({
            ...accessory,
            user_id: userId
          })
        },
        token
      );
      return response;
    } catch (error) {
      console.error('Error actualizando accesorio:', error);
      throw error;
    }
  }

  async deleteAccessory(id, token, userId) {
    try {
      const response = await this.makeAuthenticatedRequest(
        `${this.baseUrl}/api/v1/accessories/${id}?user_id=${userId}`,
        { method: 'DELETE' },
        token
      );
      return response;
    } catch (error) {
      console.error('Error eliminando accesorio:', error);
      throw error;
    }
  }

  // === NOTIFICACIONES ===
  async getNotifications(token, userId) {
    try {
      const response = await this.makeAuthenticatedRequest(
        `${this.baseUrl}/api/v1/notifications?user_id=${userId}`,
        { method: 'GET' },
        token
      );
      return response;
    } catch (error) {
      console.error('Error obteniendo notificaciones:', error);
      throw error;
    }
  }

  async saveNotification(notification, token, userId) {
    try {
      const response = await this.makeAuthenticatedRequest(
        `${this.baseUrl}/api/v1/notifications`,
        {
          method: 'POST',
          body: JSON.stringify({
            ...notification,
            user_id: userId
          })
        },
        token
      );
      return response;
    } catch (error) {
      console.error('Error guardando notificación:', error);
      throw error;
    }
  }

  async updateNotification(id, notification, token, userId) {
    try {
      const response = await this.makeAuthenticatedRequest(
        `${this.baseUrl}/api/v1/notifications/${id}`,
        {
          method: 'PUT',
          body: JSON.stringify({
            ...notification,
            user_id: userId
          })
        },
        token
      );
      return response;
    } catch (error) {
      console.error('Error actualizando notificación:', error);
      throw error;
    }
  }

  // === VALIDACIÓN DE LICENCIA ===
  async validateUserLicense(token, userId) {
    try {
      const response = await this.makeAuthenticatedRequest(
        `${this.baseUrl}/api/v1/auth/validate-license`,
        {
          method: 'POST',
          body: JSON.stringify({ user_id: userId })
        },
        token
      );
      return response;
    } catch (error) {
      console.error('Error validando licencia:', error);
      throw error;
    }
  }

  // === SINCRONIZACIÓN COMPLETA ===
  async syncAllData(token, userId) {
    try {
      const [equipment, clients, sales, purchases, repairs, accessories, notifications] = await Promise.all([
        this.getEquipment(token, userId),
        this.getClients(token, userId),
        this.getSales(token, userId),
        this.getPurchases(token, userId),
        this.getRepairs(token, userId),
        this.getAccessories(token, userId),
        this.getNotifications(token, userId)
      ]);

      return {
        equipment: equipment.data || equipment || [],
        clients: clients.data || clients || [],
        sales: sales.data || sales || [],
        purchases: purchases.data || purchases || [],
        repairs: repairs.data || repairs || [],
        accessories: accessories.data || accessories || [],
        notifications: notifications.data || notifications || []
      };
    } catch (error) {
      console.error('Error sincronizando datos:', error);
      throw error;
    }
  }

  // === COLA DE SINCRONIZACIÓN ===
  addToSyncQueue(operation) {
    this.syncQueue.push({
      ...operation,
      timestamp: Date.now(),
      retries: 0
    });
    
    if (this.isOnline) {
      this.processSyncQueue();
    }
  }

  async processSyncQueue() {
    if (!this.isOnline || this.syncQueue.length === 0) {
      return;
    }

    const queue = [...this.syncQueue];
    this.syncQueue = [];

    for (const operation of queue) {
      try {
        await this.executeSyncOperation(operation);
      } catch (error) {
        console.error('Error procesando operación de sincronización:', error);
        
        // Reintentar si no se ha excedido el límite
        if (operation.retries < 3) {
          operation.retries++;
          this.syncQueue.push(operation);
        }
      }
    }
  }

  async executeSyncOperation(operation) {
    const { type, data, token, userId } = operation;
    
    switch (type) {
      case 'SAVE_EQUIPMENT':
        await this.saveEquipment(data, token, userId);
        break;
      case 'UPDATE_EQUIPMENT':
        await this.updateEquipment(data.id, data, token, userId);
        break;
      case 'DELETE_EQUIPMENT':
        await this.deleteEquipment(data.id, token, userId);
        break;
      case 'SAVE_CLIENT':
        await this.saveClient(data, token, userId);
        break;
      case 'UPDATE_CLIENT':
        await this.updateClient(data.id, data, token, userId);
        break;
      case 'SAVE_SALE':
        await this.saveSale(data, token, userId);
        break;
      case 'SAVE_PURCHASE':
        await this.savePurchase(data, token, userId);
        break;
      case 'SAVE_REPAIR':
        await this.saveRepair(data, token, userId);
        break;
      case 'UPDATE_REPAIR':
        await this.updateRepair(data.id, data, token, userId);
        break;
      case 'SAVE_ACCESSORY':
        await this.saveAccessory(data, token, userId);
        break;
      case 'UPDATE_ACCESSORY':
        await this.updateAccessory(data.id, data, token, userId);
        break;
      case 'DELETE_ACCESSORY':
        await this.deleteAccessory(data.id, token, userId);
        break;
      case 'SAVE_NOTIFICATION':
        await this.saveNotification(data, token, userId);
        break;
      case 'UPDATE_NOTIFICATION':
        await this.updateNotification(data.id, data, token, userId);
        break;
      default:
        console.warn('Tipo de operación de sincronización no reconocido:', type);
    }
  }

  // Método para verificar conexión
  async checkConnection() {
    try {
      const response = await fetch(`${this.baseUrl}/health`, {
        method: 'GET',
        timeout: 5000
      });
      return response.ok;
    } catch (error) {
      return false;
    }
  }
}

const apiServiceInstance = new ApiService();
export default apiServiceInstance;

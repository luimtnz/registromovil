# 📱 Registro Móvil - Sistema de Gestión

Sistema de gestión integral para tiendas de venta y reparación de equipos móviles, desarrollado en React con Material-UI.

## 🎯 Funcionalidades Principales

### **Gestión de Ventas**
- Registro de equipos por IMEI
- Captura de datos del cliente (nombre, teléfono, email)
- Registro de distribuidores
- Seguimiento del estado de ventas
- **🔄 Sincronización automática con el backend**

### **Gestión de Reparaciones**
- Registro de equipos para reparación
- Captura de marca, modelo y motivo de reparación
- Control de estados: En Reparación, Pendiente, Entregado
- Inventario de reparaciones activas
- **🔄 Sincronización automática con el backend**

### **Inventario y Control**
- Vista completa del inventario de equipos
- Filtros por tipo (venta/reparación) y estado
- Búsqueda por IMEI, marca, modelo o cliente
- Estadísticas y resúmenes del negocio
- **🔄 Sincronización automática con el backend**

### **🔄 Sistema de Sincronización**
- **Sincronización automática** con el backend
- **Modo offline/online** con cola de sincronización
- **Almacenamiento local** como respaldo
- **Reintentos automáticos** en caso de error
- **Indicadores visuales** del estado de conexión

## 🚀 Tecnologías Utilizadas

- **Frontend**: React 18.3.1
- **UI Framework**: Material-UI (MUI) v5.16.7
- **Routing**: React Router DOM v6.26.1
- **Estilos**: Emotion (styled components)
- **Build Tool**: Create React App

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes de la aplicación
│   ├── Dashboard.js    # Panel principal con estadísticas
│   ├── UserRegister.js # Registro de equipos móviles
│   ├── Inventory.js    # Gestión del inventario
│   ├── Sidebar.js      # Navegación lateral
│   ├── Login.js        # Autenticación
│   ├── Register.js     # Registro de usuarios
│   ├── SyncStatus.js   # Indicador de estado de sincronización
│   └── SyncNotification.js # Notificaciones de sincronización
├── contexts/           # Contextos de React
│   ├── AuthContext.js  # Contexto de autenticación
│   └── DataContext.js  # Contexto de datos con sincronización
├── services/           # Servicios de API
│   └── apiService.js   # Servicio de sincronización con backend
├── config/             # Configuración
│   └── api.js          # Configuración de la API
├── App.js              # Componente raíz y enrutamiento
└── index.js            # Punto de entrada
```

## 🛠️ Instalación y Uso

### Prerrequisitos
- Node.js (versión 14 o superior)
- npm o yarn

### Instalación
```bash
# Clonar el repositorio
git clone [url-del-repositorio]

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm start

# Construir para producción
npm run build
```

### Scripts Disponibles
- `npm start` - Ejecuta la aplicación en modo desarrollo
- `npm test` - Ejecuta las pruebas
- `npm run build` - Construye la aplicación para producción
- `npm run eject` - Expone la configuración de webpack (irreversible)

## 📱 Características del Sistema

### **Registro de Equipos**
- **Ventas**: IMEI, marca, modelo, datos del cliente
- **Reparaciones**: IMEI, marca, modelo, motivo, estado
- **Distribuidores**: Solo IMEI y nombre del distribuidor

### **Estados de Equipos**
- **Ventas**: Vendido, En Inventario
- **Reparaciones**: En Reparación, Pendiente, Entregado

### **Dashboard Inteligente**
- Estadísticas en tiempo real
- Resumen de ventas y reparaciones
- Equipos recientes
- Acciones rápidas

## 🔧 Configuración

La aplicación está configurada para funcionar inmediatamente después de la instalación. Para personalizar:

1. **Colores y temas**: Modificar en `src/App.css`
2. **Rutas**: Configurar en `src/App.js`
3. **Componentes**: Editar en `src/components/`

## 🔄 Configuración de Sincronización

### Variables de Entorno
Crear un archivo `.env` en la raíz del proyecto:

```env
# URL del backend
REACT_APP_API_URL=http://localhost:8001

# Configuración de sincronización
REACT_APP_SYNC_INTERVAL=300000
REACT_APP_MAX_RETRY_ATTEMPTS=3
REACT_APP_RETRY_DELAY=1000
```

### Funcionamiento del Sistema de Sincronización

1. **Al hacer login**: Se sincronizan automáticamente todos los datos del usuario
2. **Operaciones CRUD**: Cada operación se guarda localmente y se sincroniza con el backend
3. **Modo offline**: Los datos se guardan localmente y se sincronizan cuando se restaure la conexión
4. **Cola de sincronización**: Las operaciones fallidas se reintentan automáticamente
5. **Indicadores visuales**: El usuario siempre sabe el estado de la sincronización

## 📊 Funcionalidades Implementadas

- [x] Sistema de autenticación completo
- [x] Sincronización automática con backend
- [x] Modo offline/online con cola de sincronización
- [x] Almacenamiento local como respaldo
- [x] Indicadores visuales de estado de conexión
- [x] Gestión de equipos, clientes, ventas, compras y reparaciones
- [x] Dashboard con estadísticas en tiempo real
- [x] Sistema de notificaciones

## 🚧 Próximas Funcionalidades

- [ ] Reportes y exportación de datos
- [ ] Sistema de facturación
- [ ] App móvil (React Native)
- [ ] Sincronización en tiempo real (WebSockets)

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Soporte

Para soporte técnico o consultas:
- Crear un issue en el repositorio
- Contactar al equipo de desarrollo

---

**Desarrollado con ❤️ para la gestión eficiente de equipos móviles**

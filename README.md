# 📱 Registro Móvil - Sistema de Gestión

Sistema de gestión integral para tiendas de venta y reparación de equipos móviles, desarrollado en React con Material-UI.

## 🎯 Funcionalidades Principales

### **Gestión de Ventas**
- Registro de equipos por IMEI
- Captura de datos del cliente (nombre, teléfono, email)
- Registro de distribuidores
- Seguimiento del estado de ventas

### **Gestión de Reparaciones**
- Registro de equipos para reparación
- Captura de marca, modelo y motivo de reparación
- Control de estados: En Reparación, Pendiente, Entregado
- Inventario de reparaciones activas

### **Inventario y Control**
- Vista completa del inventario de equipos
- Filtros por tipo (venta/reparación) y estado
- Búsqueda por IMEI, marca, modelo o cliente
- Estadísticas y resúmenes del negocio

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
│   └── Register.js     # Registro de usuarios
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

## 📊 Próximas Funcionalidades

- [ ] Sistema de autenticación completo
- [ ] Base de datos y API backend
- [ ] Reportes y exportación de datos
- [ ] Notificaciones y alertas
- [ ] Gestión de clientes avanzada
- [ ] Sistema de facturación
- [ ] App móvil (React Native)

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

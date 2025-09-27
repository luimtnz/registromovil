import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { buildApiUrl, getDefaultHeaders } from '../config/api';
import {
  Container,
  Paper,
  Button,
  Typography,
  Box,
  Alert,
  Grid,
  TextField,
  Card,
  CardContent,
  Chip,
  CircularProgress
} from '@mui/material';
import {
  CheckCircle,
  Error,
  Refresh,
  Login,
  PersonAdd,
  VpnKey
} from '@mui/icons-material';

function ApiTest() {
  const { login, register, verifyLicense, loading } = useAuth();
  const [testResults, setTestResults] = useState({});
  const [testCredentials, setTestCredentials] = useState({
    email: 'test@example.com',
    password: 'password123',
    storeName: 'Tienda de Prueba',
    ownerName: 'Usuario Prueba',
    phone: '3001234567',
    address: 'Calle 123 #45-67',
    businessType: 'Venta',
    estimatedEquipment: 100,
    selectedPlan: 'DEMO-2024'
  });

  const runTest = async (testName, testFunction) => {
    try {
      setTestResults(prev => ({ ...prev, [testName]: { loading: true } }));
      const result = await testFunction();
      setTestResults(prev => ({ 
        ...prev, 
        [testName]: { 
          success: true, 
          result,
          loading: false 
        } 
      }));
    } catch (error) {
      setTestResults(prev => ({ 
        ...prev, 
        [testName]: { 
          success: false, 
          error: error.message,
          loading: false 
        } 
      }));
    }
  };

  const testHealthCheck = async () => {
    const response = await fetch(buildApiUrl('/health'));
    const data = await response.json();
    return { status: response.status, data };
  };

  const testAuthHealthCheck = async () => {
    const response = await fetch(buildApiUrl('/api/v1/auth/health'));
    const data = await response.json();
    return { status: response.status, data };
  };

  const testLogin = async () => {
    return await login({
      email: testCredentials.email,
      password: testCredentials.password
    });
  };

  const testRegister = async () => {
    return await register(testCredentials);
  };

  const testVerifyLicense = async () => {
    return await verifyLicense(testCredentials.selectedPlan);
  };

  const TestCard = ({ title, icon, testName, testFunction, description }) => (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          {icon}
          <Typography variant="h6" sx={{ ml: 1 }}>
            {title}
          </Typography>
        </Box>
        
        <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
          {description}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Button
            variant="outlined"
            onClick={() => runTest(testName, testFunction)}
            disabled={loading || testResults[testName]?.loading}
            startIcon={testResults[testName]?.loading ? <CircularProgress size={16} /> : <Refresh />}
            sx={{ mr: 2 }}
          >
            Ejecutar Prueba
          </Button>

          {testResults[testName] && (
            <Chip
              icon={testResults[testName].success ? <CheckCircle /> : <Error />}
              label={testResults[testName].success ? 'Exitoso' : 'Error'}
              color={testResults[testName].success ? 'success' : 'error'}
            />
          )}
        </Box>

        {testResults[testName] && (
          <Alert 
            severity={testResults[testName].success ? 'success' : 'error'}
            sx={{ mt: 1 }}
          >
            <Typography variant="body2">
              {testResults[testName].success 
                ? JSON.stringify(testResults[testName].result, null, 2)
                : testResults[testName].error
              }
            </Typography>
          </Alert>
        )}
      </CardContent>
    </Card>
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        🧪 Pruebas de Integración API
      </Typography>
      
      <Typography variant="body1" color="textSecondary" sx={{ mb: 4 }}>
        Esta página permite probar la integración con el backend de Registro Móvil.
        Asegúrese de que el servidor backend esté ejecutándose en {buildApiUrl('')}.
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Pruebas de Conectividad
            </Typography>

            <TestCard
              title="Health Check General"
              icon={<CheckCircle color="primary" />}
              testName="health"
              testFunction={testHealthCheck}
              description="Verifica que la API esté funcionando correctamente"
            />

            <TestCard
              title="Health Check Auth"
              icon={<VpnKey color="primary" />}
              testName="authHealth"
              testFunction={testAuthHealthCheck}
              description="Verifica que el módulo de autenticación esté funcionando"
            />

            <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
              Pruebas de Autenticación
            </Typography>

            <TestCard
              title="Verificar Licencia"
              icon={<VpnKey color="primary" />}
              testName="verifyLicense"
              testFunction={testVerifyLicense}
              description="Verifica que la licencia DEMO-2024 sea válida"
            />

            <TestCard
              title="Registro de Usuario"
              icon={<PersonAdd color="primary" />}
              testName="register"
              testFunction={testRegister}
              description="Registra un nuevo usuario con los datos de prueba"
            />

            <TestCard
              title="Login de Usuario"
              icon={<Login color="primary" />}
              testName="login"
              testFunction={testLogin}
              description="Inicia sesión con las credenciales de prueba"
            />
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Configuración de Pruebas
            </Typography>
            
            <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
              Modifique estos valores para probar diferentes escenarios:
            </Typography>

            <TextField
              fullWidth
              label="Email"
              value={testCredentials.email}
              onChange={(e) => setTestCredentials(prev => ({ ...prev, email: e.target.value }))}
              margin="normal"
              size="small"
            />

            <TextField
              fullWidth
              label="Contraseña"
              type="password"
              value={testCredentials.password}
              onChange={(e) => setTestCredentials(prev => ({ ...prev, password: e.target.value }))}
              margin="normal"
              size="small"
            />

            <TextField
              fullWidth
              label="Nombre de Tienda"
              value={testCredentials.storeName}
              onChange={(e) => setTestCredentials(prev => ({ ...prev, storeName: e.target.value }))}
              margin="normal"
              size="small"
            />

            <TextField
              fullWidth
              label="Plan de Licencia"
              value={testCredentials.selectedPlan}
              onChange={(e) => setTestCredentials(prev => ({ ...prev, selectedPlan: e.target.value }))}
              margin="normal"
              size="small"
              helperText="DEMO-2024, PRO-2024, ENTERPRISE-2024"
            />

            <Box sx={{ mt: 3, p: 2, bgcolor: 'info.50', borderRadius: 1 }}>
              <Typography variant="body2" color="info.main" fontWeight="bold">
                💡 Consejos para las pruebas:
              </Typography>
              <Typography variant="body2" color="info.main" sx={{ mt: 1 }}>
                • Ejecute las pruebas en orden: Health Check → Verificar Licencia → Registro → Login<br/>
                • Use emails únicos para evitar conflictos<br/>
                • Verifique que el backend esté ejecutándose<br/>
                • Revise la consola del navegador para logs adicionales
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ApiTest;

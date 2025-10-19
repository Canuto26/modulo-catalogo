// Configuración de entorno para el módulo
export interface EnvironmentConfig {
  useMockData: boolean;
  apiBaseUrl: string;
  enableLogging: boolean;
  mockDelay: number;
  errorRate: number;
}

// Configuración por defecto
const defaultConfig: EnvironmentConfig = {
  useMockData: true, // Cambiar a false cuando tengas el backend Django
  apiBaseUrl: 'http://localhost:8000/api',
  enableLogging: true,
  mockDelay: 1000, // Delay en milisegundos para simular red
  errorRate: 0.05, // 5% de probabilidad de error
};

// Configuración de desarrollo
const developmentConfig: EnvironmentConfig = {
  ...defaultConfig,
  useMockData: true,
  enableLogging: true,
  mockDelay: 800,
  errorRate: 0.02,
};

// Configuración de producción
const productionConfig: EnvironmentConfig = {
  ...defaultConfig,
  useMockData: false,
  apiBaseUrl: 'https://tu-api-produccion.com/api',
  enableLogging: false,
  mockDelay: 0,
  errorRate: 0,
};

// Función para obtener la configuración según el entorno
export const getEnvironmentConfig = (): EnvironmentConfig => {
  const env = import.meta.env.MODE || 'development';
  
  switch (env) {
    case 'production':
      return productionConfig;
    case 'development':
    default:
      return developmentConfig;
  }
};

// Configuración actual
export const config = getEnvironmentConfig();

// Función para cambiar entre mock y API real
export const toggleMockData = (useMock: boolean) => {
  config.useMockData = useMock;
  console.log(`Mock data ${useMock ? 'habilitado' : 'deshabilitado'}`);
};

// Función para logging condicional
export const log = (message: string, data?: any) => {
  if (config.enableLogging) {
    console.log(`[${new Date().toISOString()}] ${message}`, data || '');
  }
};

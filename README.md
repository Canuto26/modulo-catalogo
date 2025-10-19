# Módulo de Catálogo de Productos

Este es un módulo de muestra desarrollado con **React + TypeScript + SWC** que demuestra la estructura y organización de un proyecto frontend moderno.

## 🏗️ Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── ProductCard.tsx
│   ├── ProductList.tsx
│   ├── ProductFilters.tsx
│   ├── LoadingSpinner.tsx
│   └── index.ts
├── hooks/              # Hooks personalizados
│   ├── useProducts.ts
│   ├── useProduct.ts
│   └── useCategories.ts
├── screens/            # Pantallas principales
│   ├── ProductsScreen.tsx
│   ├── ProductDetailScreen.tsx
│   └── index.ts
├── services/           # Servicios para API
│   ├── api.ts
│   └── productService.ts
├── types/              # Definiciones de tipos TypeScript
│   └── index.ts
├── App.tsx             # Componente principal
└── App.css             # Estilos globales
```

## 🚀 Características

### **Components** (`/components`)
- **ProductCard**: Tarjeta individual para mostrar un producto
- **ProductList**: Lista de productos con estados de carga y error
- **ProductFilters**: Filtros para buscar y filtrar productos
- **LoadingSpinner**: Componente de carga reutilizable

### **Hooks** (`/hooks`)
- **useProducts**: Hook para manejar lista de productos con filtros
- **useProduct**: Hook para manejar un producto individual (CRUD)
- **useCategories**: Hook para manejar categorías de productos

### **Screens** (`/screens`)
- **ProductsScreen**: Pantalla principal con lista de productos
- **ProductDetailScreen**: Pantalla de detalles de un producto

### **Services** (`/services`)
- **ApiService**: Clase base para comunicación con API
- **ProductService**: Servicio específico para operaciones de productos

### **Types** (`/types`)
- Definiciones TypeScript para Product, Category, API responses, etc.

## 🛠️ Tecnologías Utilizadas

- **React 19** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **SWC** - Compilador rápido (configurado en Vite)
- **Vite** - Herramienta de desarrollo y build

## 🔧 Configuración del Backend

Este módulo está diseñado para trabajar con un backend Django. La configuración de la API se encuentra en:

```typescript
// src/services/api.ts
const API_BASE_URL = 'http://localhost:8000/api';
```

### Endpoints esperados del backend Django:

```
GET    /api/products/           # Lista de productos
GET    /api/products/{id}/      # Producto específico
POST   /api/products/           # Crear producto
PUT    /api/products/{id}/      # Actualizar producto
DELETE /api/products/{id}/       # Eliminar producto
GET    /api/categories/         # Lista de categorías
```

## 🎯 Conceptos Demostrados

### 1. **Separación de Responsabilidades**
- Cada carpeta tiene un propósito específico
- Componentes reutilizables separados de pantallas
- Lógica de negocio en hooks personalizados

### 2. **TypeScript en Acción**
- Interfaces bien definidas para datos
- Tipado de props de componentes
- Tipado de respuestas de API

### 3. **Hooks Personalizados**
- Encapsulación de lógica de estado
- Reutilización de lógica entre componentes
- Manejo de estados de carga y error

### 4. **Servicios y API**
- Clase base para comunicación HTTP
- Servicios específicos por dominio
- Manejo centralizado de errores

### 5. **Componentes Modulares**
- Componentes pequeños y enfocados
- Props tipadas con TypeScript
- Estados de carga y error manejados

## 🚀 Cómo Ejecutar

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Ejecutar en modo desarrollo:**
   ```bash
   npm run dev
   ```

3. **Construir para producción:**
   ```bash
   npm run build
   ```

## 🧪 Pruebas Locales y Testing

El módulo incluye un sistema completo de testing local que te permite probar todas las funcionalidades sin necesidad del backend Django.

### **Panel de Testing**
- Haz clic en el botón **"🧪 Testing"** en la esquina superior derecha
- Cambia entre datos mock y API real
- Resetea datos de prueba
- Agrega productos de prueba
- Ajusta configuraciones avanzadas

### **Datos Mock Incluidos**
- **10 productos de ejemplo** con diferentes categorías
- **5 categorías** predefinidas
- **Simulación de delay de red** (configurable)
- **Simulación de errores** aleatorios
- **Filtros y búsqueda** completamente funcionales

### **Configuración de Entorno**
```typescript
// src/config/environment.ts
export const config = {
  useMockData: true,        // Cambiar a false para usar API real
  apiBaseUrl: 'http://localhost:8000/api',
  enableLogging: true,      // Logs en consola
  mockDelay: 1000,         // Delay simulado en ms
  errorRate: 0.05,         // 5% probabilidad de error
};
```

### **Funcionalidades de Testing**
- ✅ **Lista de productos** con datos mock
- ✅ **Filtros y búsqueda** funcionales
- ✅ **Detalles de producto** individual
- ✅ **Estados de carga** y error
- ✅ **CRUD completo** (Crear, Leer, Actualizar, Eliminar)
- ✅ **Navegación** entre pantallas
- ✅ **Responsive design**

### **Cambiar a API Real**
Cuando tengas tu backend Django listo:
1. Abre el Panel de Testing
2. Desactiva "Usar datos mock"
3. Configura la URL de tu API en `src/config/environment.ts`
4. Recarga la aplicación

## 📝 Notas de Desarrollo

- El módulo está configurado para trabajar con un backend Django
- Los estilos están optimizados para ser responsivos
- La estructura permite fácil escalabilidad
- Cada archivo tiene un propósito específico y bien definido

## 🔄 Próximos Pasos

Para completar el módulo, necesitarás:

1. **Backend Django** con los endpoints correspondientes
2. **Base de datos PostgreSQL** configurada
3. **Autenticación** si es necesaria
4. **Validaciones** adicionales en el frontend
5. **Tests** unitarios y de integración

Este módulo sirve como base sólida para entender cómo estructurar un proyecto React + TypeScript moderno con separación clara de responsabilidades.
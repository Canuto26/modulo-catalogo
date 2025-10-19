import { Product, Category } from '../types';

// Categorías de ejemplo
export const mockCategories: Category[] = [
  { id: 1, name: 'Electrónicos', description: 'Dispositivos electrónicos y tecnología' },
  { id: 2, name: 'Ropa', description: 'Vestimenta y accesorios' },
  { id: 3, name: 'Hogar', description: 'Artículos para el hogar' },
  { id: 4, name: 'Deportes', description: 'Equipos y accesorios deportivos' },
  { id: 5, name: 'Libros', description: 'Libros y material educativo' },
];

// Productos de ejemplo
export const mockProducts: Product[] = [
  {
    id: 1,
    name: 'iPhone 15 Pro',
    description: 'El iPhone más avanzado con chip A17 Pro, cámara de 48MP y pantalla Super Retina XDR de 6.1 pulgadas.',
    price: 4500000,
    category: 'Electrónicos',
    image: 'https://via.placeholder.com/300x300/007AFF/FFFFFF?text=iPhone+15+Pro',
    stock: 15,
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
  },
  {
    id: 2,
    name: 'MacBook Air M2',
    description: 'Laptop ultradelgada con chip M2, pantalla Liquid Retina de 13.6 pulgadas y hasta 18 horas de batería.',
    price: 6500000,
    category: 'Electrónicos',
    image: 'https://via.placeholder.com/300x300/34C759/FFFFFF?text=MacBook+Air',
    stock: 8,
    createdAt: '2024-01-10T14:20:00Z',
    updatedAt: '2024-01-10T14:20:00Z',
  },
  {
    id: 3,
    name: 'Camiseta Nike Dri-FIT',
    description: 'Camiseta deportiva de secado rápido con tecnología Dri-FIT para máximo rendimiento.',
    price: 85000,
    category: 'Ropa',
    image: 'https://via.placeholder.com/300x300/FF3B30/FFFFFF?text=Nike+Dri-FIT',
    stock: 50,
    createdAt: '2024-01-08T09:15:00Z',
    updatedAt: '2024-01-08T09:15:00Z',
  },
  {
    id: 4,
    name: 'Sofá 3 Puestos Gris',
    description: 'Sofá moderno de 3 puestos en tela gris, perfecto para salas contemporáneas.',
    price: 1200000,
    category: 'Hogar',
    image: 'https://via.placeholder.com/300x300/8E8E93/FFFFFF?text=Sofa+3+Puestos',
    stock: 3,
    createdAt: '2024-01-05T16:45:00Z',
    updatedAt: '2024-01-05T16:45:00Z',
  },
  {
    id: 5,
    name: 'Pelota de Fútbol Adidas',
    description: 'Pelota oficial de fútbol Adidas, ideal para partidos y entrenamientos.',
    price: 120000,
    category: 'Deportes',
    image: 'https://via.placeholder.com/300x300/FF9500/FFFFFF?text=Adidas+Ball',
    stock: 25,
    createdAt: '2024-01-12T11:30:00Z',
    updatedAt: '2024-01-12T11:30:00Z',
  },
  {
    id: 6,
    name: 'Clean Code - Robert Martin',
    description: 'Libro fundamental sobre programación limpia y buenas prácticas de desarrollo.',
    price: 85000,
    category: 'Libros',
    image: 'https://via.placeholder.com/300x300/5856D6/FFFFFF?text=Clean+Code',
    stock: 12,
    createdAt: '2024-01-03T13:20:00Z',
    updatedAt: '2024-01-03T13:20:00Z',
  },
  {
    id: 7,
    name: 'AirPods Pro 2da Gen',
    description: 'Auriculares inalámbricos con cancelación activa de ruido y audio espacial.',
    price: 1200000,
    category: 'Electrónicos',
    image: 'https://via.placeholder.com/300x300/007AFF/FFFFFF?text=AirPods+Pro',
    stock: 20,
    createdAt: '2024-01-18T08:45:00Z',
    updatedAt: '2024-01-18T08:45:00Z',
  },
  {
    id: 8,
    name: 'Zapatillas Nike Air Max',
    description: 'Zapatillas deportivas con tecnología Air Max para máximo confort y estilo.',
    price: 450000,
    category: 'Ropa',
    image: 'https://via.placeholder.com/300x300/FF3B30/FFFFFF?text=Nike+Air+Max',
    stock: 30,
    createdAt: '2024-01-14T15:10:00Z',
    updatedAt: '2024-01-14T15:10:00Z',
  },
  {
    id: 9,
    name: 'Mesa de Centro Moderna',
    description: 'Mesa de centro de madera maciza con diseño minimalista y acabado natural.',
    price: 350000,
    category: 'Hogar',
    image: 'https://via.placeholder.com/300x300/8E8E93/FFFFFF?text=Mesa+Centro',
    stock: 5,
    createdAt: '2024-01-07T12:00:00Z',
    updatedAt: '2024-01-07T12:00:00Z',
  },
  {
    id: 10,
    name: 'React: The Complete Guide',
    description: 'Guía completa de React con ejemplos prácticos y mejores prácticas.',
    price: 95000,
    category: 'Libros',
    image: 'https://via.placeholder.com/300x300/5856D6/FFFFFF?text=React+Guide',
    stock: 18,
    createdAt: '2024-01-20T10:15:00Z',
    updatedAt: '2024-01-20T10:15:00Z',
  },
];

// Función para simular delay de red
export const simulateNetworkDelay = (ms: number = 1000): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// Función para simular errores aleatorios (opcional)
export const simulateRandomError = (errorRate: number = 0.1): boolean => {
  return Math.random() < errorRate;
};

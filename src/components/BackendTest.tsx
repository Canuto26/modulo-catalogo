import React, { useState, useEffect } from 'react';
import { productService } from '../services/productService';
import type { Product, Category } from '../types/types';

/**
 * Componente de prueba para verificar la integración con Django
 * Muestra el estado de la conexión y datos de prueba
 */
export const BackendTest: React.FC = () => {
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    testConnection();
  }, []);

  const testConnection = async () => {
    try {
      setConnectionStatus('checking');
      setError(null);

      const productResponse = await productService.getProducts();
      const categoryResponse = await productService.getCategories();

      setProducts(productResponse.data || []);
      setCategories(categoryResponse.data || []);

      setConnectionStatus('connected');
    } catch (error) {
      setConnectionStatus('error');
      setError('Error al conectar con el backend');
    }
  };


  const getStatusColor = () => {
    switch (connectionStatus) {
      case 'checking': return 'text-yellow-600';
      case 'connected': return 'text-green-600';
      case 'error': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusText = () => {
    switch (connectionStatus) {
      case 'checking': return '🔄 Verificando conexión...';
      case 'connected': return '✅ Conectado a Django';
      case 'error': return '❌ Error de conexión';
      default: return '❓ Estado desconocido';
    }
  };

  return (
    <div className="backend-test p-6 bg-gray-50 rounded-lg border">
      <h2 className="text-2xl font-bold mb-4">🔗 Prueba de Conexión Backend</h2>

      {/* Estado de conexión */}
      <div className="mb-6">
        <div className={`text-lg font-semibold ${getStatusColor()}`}>
          {getStatusText()}
        </div>
        {error && (
          <div className="mt-2 p-3 bg-red-100 border border-red-300 rounded text-red-700">
            <strong>Error:</strong> {error}
          </div>
        )}
      </div>

      {/* Botón de prueba */}
      <button
        onClick={testConnection}
        disabled={connectionStatus === 'checking'}
        className="mb-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {connectionStatus === 'checking' ? 'Probando...' : 'Probar Conexión'}
      </button>

      {/* Datos cargados */}
      {connectionStatus === 'connected' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Categorías */}
          <div>
            <h3 className="text-lg font-semibold mb-3">📂 Categorías ({categories.length})</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category.id} className="p-2 bg-white border rounded">
                  <div className="font-medium">{category.name}</div>
                  {category.description && (
                    <div className="text-sm text-gray-600">{category.description}</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Productos */}
          <div>
            <h3 className="text-lg font-semibold mb-3">📦 Productos ({products.length})</h3>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {products.map((product) => (
                <div key={product.id} className="p-2 bg-white border rounded">
                  <div className="font-medium">{product.name}</div>
                  <div className="text-sm text-gray-600">
                    {product.category} - ${product.price.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500">
                    Stock: {product.stock} | SKU: {product.sku}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

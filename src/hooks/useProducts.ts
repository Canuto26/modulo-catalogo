import { useState, useEffect, useCallback } from 'react';
import type { Product, ProductFilters, LoadingState } from '../types/types';
import { productService } from '../services/productService';

// Hook personalizado para manejar el estado de productos
export const useProducts = (initialFilters?: ProductFilters) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<LoadingState>({
    isLoading: false,
    error: null,
  });
  const [filters, setFilters] = useState<ProductFilters>(initialFilters || {});

  // Función para cargar productos
  const loadProducts = useCallback(async () => {
    setLoading({ isLoading: true, error: null });
    
    try {
      // IMPORTANTE: Ahora usa el servicio real de Django
      const response = await productService.getProducts(filters);
      setProducts(response.data);
    } catch (error) {
      console.error('Error al cargar productos:', error);
      setLoading({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Error al cargar productos' 
      });
    } finally {
      setLoading(prev => ({ ...prev, isLoading: false }));
    }
  }, [filters]);

  // Función para actualizar filtros
  const updateFilters = useCallback((newFilters: Partial<ProductFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  // Función para limpiar filtros
  const clearFilters = useCallback(() => {
    setFilters({});
  }, []);

  // Cargar productos cuando cambien los filtros
  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return {
    products,
    loading,
    filters,
    loadProducts,
    updateFilters,
    clearFilters,
  };
};

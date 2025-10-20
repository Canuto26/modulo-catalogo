import { useState, useEffect, useCallback } from 'react';
import type{ Category, LoadingState } from '../types';
import { productService } from '../services/productService';

// Hook personalizado para manejar categorías
export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<LoadingState>({
    isLoading: false,
    error: null,
  });

  // Función para cargar categorías
  const loadCategories = useCallback(async () => {
    setLoading({ isLoading: true, error: null });
    
    try {
      // IMPORTANTE: Ahora usa el servicio real de Django
      const response = await productService.getCategories();
      setCategories(response.data);
    } catch (error) {
      console.error('Error al cargar categorías:', error);
      setLoading({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Error al cargar categorías' 
      });
    } finally {
      setLoading(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  // Cargar categorías al montar el componente
  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  return {
    categories,
    loading,
    loadCategories,
  };
};

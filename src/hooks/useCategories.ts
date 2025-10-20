import { useState, useEffect, useCallback } from 'react';
import type{ Category, LoadingState } from '../types/types';
import { productService } from '../services/productService';

// Hook personalizado para manejar categorías
export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<LoadingState>({
    isLoading: false,
    error: null,
  });

  const loadCategories = useCallback(async () => {
    setLoading({ isLoading: true, error: null });
    try {
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

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  return {
    categories,
    loading,
    loadCategories,
  };
};

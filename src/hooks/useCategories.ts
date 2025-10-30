import { useState, useEffect, useCallback } from 'react';
import { productService } from '../services/productService';
import type { 
  Category, 
  LoadingState, 
  ApiResponse 
} from '../types/ProductTypes';

interface CreateCategoryRequest {
  name: string;
  description?: string;
}

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<LoadingState>({
    isLoading: false,
    error: null
  });

  const fetchCategories = useCallback(async () => {
    setLoading({ isLoading: true, error: null });
    try {
      const response: ApiResponse<Category[]> = await productService.getCategories();
      setCategories(response.data);
      setLoading({ isLoading: false, error: null });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Error al cargar las categorías';
      setLoading({ 
        isLoading: false, 
        error: errorMessage 
      });
    }
  }, []);

  const createCategory = useCallback(async (categoryData: CreateCategoryRequest) => {
    setLoading({ isLoading: true, error: null });
    try {
      // Simulación hasta que implementes el método en el servicio
      const newCategory: Category = {
        id: Math.max(0, ...categories.map(c => c.id)) + 1,
        ...categoryData
      };
      
      setCategories(prev => [...prev, newCategory]);
      setLoading({ isLoading: false, error: null });
      return newCategory;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Error al crear la categoría';
      setLoading({ isLoading: false, error: errorMessage });
      throw error;
    }
  }, [categories]);

  const updateCategory = useCallback(async (id: number, categoryData: Partial<Category>) => {
    setLoading({ isLoading: true, error: null });
    try {
      // Simulación hasta que implementes el método en el servicio
      setCategories(prev => prev.map(c => 
        c.id === id ? { ...c, ...categoryData } : c
      ));
      setLoading({ isLoading: false, error: null });
      
      const updatedCategory = categories.find(c => c.id === id);
      if (!updatedCategory) {
        throw new Error('Categoría no encontrada');
      }
      
      return { ...updatedCategory, ...categoryData };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Error al actualizar la categoría';
      setLoading({ isLoading: false, error: errorMessage });
      throw error;
    }
  }, [categories]);

  const deleteCategory = useCallback(async (id: number) => {
    setLoading({ isLoading: true, error: null });
    try {
      // Simulación hasta que implementes el método en el servicio
      setCategories(prev => prev.filter(c => c.id !== id));
      setLoading({ isLoading: false, error: null });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Error al eliminar la categoría';
      setLoading({ isLoading: false, error: errorMessage });
      throw error;
    }
  }, []);

  // Efecto para cargar categorías al montar el hook
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return {
    categories,
    loading,
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory,
  };
};
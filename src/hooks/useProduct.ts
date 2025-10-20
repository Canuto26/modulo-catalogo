import { useState, useCallback } from 'react';
import type { Product, CreateProductRequest, UpdateProductRequest, LoadingState } from '../types';
import { productServiceAdapter } from '../services/productServiceAdapter';

// Hook personalizado para manejar un producto individual
export const useProduct = (productId?: number) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<LoadingState>({
    isLoading: false,
    error: null,
  });

  // Función para cargar un producto por ID
  const loadProduct = useCallback(async (id: number) => {
    setLoading({ isLoading: true, error: null });
    
    try {
      const response = await productServiceAdapter.getProductById(id);
      setProduct(response.data);
    } catch (error) {
      setLoading({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Error al cargar el producto' 
      });
    } finally {
      setLoading(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  // Función para crear un nuevo producto
  const createProduct = useCallback(async (productData: CreateProductRequest) => {
    setLoading({ isLoading: true, error: null });
    
    try {
      const response = await productServiceAdapter.createProduct(productData);
      setProduct(response.data);
      return response.data;
    } catch (error) {
      setLoading({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Error al crear el producto' 
      });
      throw error;
    } finally {
      setLoading(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  // Función para actualizar un producto
  const updateProduct = useCallback(async (id: number, productData: UpdateProductRequest) => {
    setLoading({ isLoading: true, error: null });
    
    try {
      const response = await productServiceAdapter.updateProduct(id, productData);
      setProduct(response.data);
      return response.data;
    } catch (error) {
      setLoading({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Error al actualizar el producto' 
      });
      throw error;
    } finally {
      setLoading(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  // Función para eliminar un producto
  const deleteProduct = useCallback(async (id: number) => {
    setLoading({ isLoading: true, error: null });
    
    try {
      await productServiceAdapter.deleteProduct(id);
      setProduct(null);
    } catch (error) {
      setLoading({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Error al eliminar el producto' 
      });
      throw error;
    } finally {
      setLoading(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  // Cargar producto si se proporciona un ID
  useState(() => {
    if (productId) {
      loadProduct(productId);
    }
  });

  return {
    product,
    loading,
    loadProduct,
    createProduct,
    updateProduct,
    deleteProduct,
  };
};

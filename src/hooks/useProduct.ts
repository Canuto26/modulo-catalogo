import { useState, useEffect, useCallback } from 'react';
import { productService } from '../services/ProductService';
import type { 
  Product, 
  ProductFilters, 
  UpdateProductRequest,
  LoadingState,
  PaginatedResponse,
  ApiResponse
} from '../types/ProductTypes';

// Hook para manejar múltiples productos (lista)
export const useProducts = (initialFilters?: ProductFilters) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState<ProductFilters>(initialFilters || {});
  const [loading, setLoading] = useState<LoadingState>({
    isLoading: false,
    error: null
  });

  const fetchProducts = useCallback(async (currentFilters?: ProductFilters) => {
    setLoading({ isLoading: true, error: null });
    try {
      const response: PaginatedResponse<Product> = await productService.getProducts(currentFilters || filters);
      setProducts(response.data);
      setLoading({ isLoading: false, error: null });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Error al cargar los productos';
      setLoading({ 
        isLoading: false, 
        error: errorMessage 
      });
    }
  }, [filters]);

  const updateFilters = useCallback((newFilters: Partial<ProductFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({});
  }, []);

  const createProduct = useCallback(async (productData: UpdateProductRequest) => {
    setLoading({ isLoading: true, error: null });
    try {
      const response: ApiResponse<Product> = await productService.createProduct(productData);
      setProducts(prev => [...prev, response.data]);
      setLoading({ isLoading: false, error: null });
      return response.data;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Error al crear el producto';
      setLoading({ isLoading: false, error: errorMessage });
      throw error;
    }
  }, []);

  const updateProduct = useCallback(async (id: number, productData: UpdateProductRequest) => {
    setLoading({ isLoading: true, error: null });
    try {
      const response: ApiResponse<Product> = await productService.updateProduct(id, productData);
      setProducts(prev => prev.map(p => p.id === id ? response.data : p));
      setLoading({ isLoading: false, error: null });
      return response.data;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Error al actualizar el producto';
      setLoading({ isLoading: false, error: errorMessage });
      throw error;
    }
  }, []);

  const deleteProduct = useCallback(async (id: number) => {
    setLoading({ isLoading: true, error: null });
    try {
      await productService.deleteProduct(id);
      setProducts(prev => prev.filter(p => p.id !== id));
      setLoading({ isLoading: false, error: null });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Error al eliminar el producto';
      setLoading({ isLoading: false, error: errorMessage });
      throw error;
    }
  }, []);

  // Efecto para cargar productos cuando cambian los filtros
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    filters,
    loading,
    fetchProducts,
    updateFilters,
    clearFilters,
    createProduct,
    updateProduct,
    deleteProduct,
  };
};

// Hook para manejar un solo producto (detalle)
export const useProduct = (productId?: number) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<LoadingState>({
    isLoading: false,
    error: null
  });

  const fetchProduct = useCallback(async (id: number) => {
    if (!id) return;
    
    setLoading({ isLoading: true, error: null });
    try {
      const response: ApiResponse<Product> = await productService.getProductById(id);
      setProduct(response.data);
      setLoading({ isLoading: false, error: null });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Error al cargar el producto';
      setLoading({ 
        isLoading: false, 
        error: errorMessage 
      });
    }
  }, []);

  const updateProduct = useCallback(async (id: number, productData: UpdateProductRequest) => {
    setLoading({ isLoading: true, error: null });
    try {
      const response: ApiResponse<Product> = await productService.updateProduct(id, productData);
      setProduct(response.data);
      setLoading({ isLoading: false, error: null });
      return response.data;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Error al actualizar el producto';
      setLoading({ isLoading: false, error: errorMessage });
      throw error;
    }
  }, []);

  const deleteProduct = useCallback(async (id: number) => {
    setLoading({ isLoading: true, error: null });
    try {
      await productService.deleteProduct(id);
      setProduct(null);
      setLoading({ isLoading: false, error: null });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Error al eliminar el producto';
      setLoading({ isLoading: false, error: errorMessage });
      throw error;
    }
  }, []);

  // Efecto para cargar el producto cuando cambia el ID
  useEffect(() => {
    if (productId) {
      fetchProduct(productId);
    }
  }, [productId, fetchProduct]);

  return {
    product,
    loading,
    fetchProduct,
    updateProduct,
    deleteProduct,
  };
};
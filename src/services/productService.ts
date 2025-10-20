import { ApiService } from './api';
import type { 
  Product, 
  Category, 
  ApiResponse, 
  PaginatedResponse, 
  ProductFilters, 
  CreateProductRequest, 
  UpdateProductRequest 
} from '../types';

// Servicio específico para productos
export class ProductService extends ApiService {
  
  // Obtener todos los productos con filtros opcionales
  async getProducts(filters?: ProductFilters): Promise<PaginatedResponse<Product>> {
    const queryParams = new URLSearchParams();
    
    if (filters?.category) queryParams.append('category', filters.category);
    if (filters?.minPrice) queryParams.append('min_price', filters.minPrice.toString());
    if (filters?.maxPrice) queryParams.append('max_price', filters.maxPrice.toString());
    if (filters?.search) queryParams.append('search', filters.search);
    
    const queryString = queryParams.toString();
    const endpoint = queryString ? `/products/?${queryString}` : '/products/';
    
    return this.get<PaginatedResponse<Product>>(endpoint);
  }

  // Obtener un producto por ID
  async getProductById(id: number): Promise<ApiResponse<Product>> {
    return this.get<ApiResponse<Product>>(`/products/${id}/`);
  }

  // Crear un nuevo producto
  async createProduct(productData: CreateProductRequest): Promise<ApiResponse<Product>> {
    return this.post<ApiResponse<Product>>('/products/', productData);
  }

  // Actualizar un producto existente
  async updateProduct(id: number, productData: UpdateProductRequest): Promise<ApiResponse<Product>> {
    return this.put<ApiResponse<Product>>(`/products/${id}/`, productData);
  }

  // Eliminar un producto
  async deleteProduct(id: number): Promise<ApiResponse<null>> {
    return this.delete<ApiResponse<null>>(`/products/${id}/`);
  }

  // Obtener todas las categorías
  async getCategories(): Promise<ApiResponse<Category[]>> {
    return this.get<ApiResponse<Category[]>>('/categories/');
  }

  // Obtener productos por categoría
  async getProductsByCategory(categoryId: number): Promise<PaginatedResponse<Product>> {
    return this.get<PaginatedResponse<Product>>(`/categories/${categoryId}/products/`);
  }
}

// Instancia del servicio para usar en la aplicación
export const productService = new ProductService();

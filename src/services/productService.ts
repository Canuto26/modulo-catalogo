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
  // IMPORTANTE: Adaptado para la respuesta de Django REST Framework
  async getProducts(filters?: ProductFilters): Promise<PaginatedResponse<Product>> {
    const queryParams = new URLSearchParams();

    if (filters?.category) queryParams.append('category', filters.category);
    if (filters?.minPrice) queryParams.append('min_price', filters.minPrice.toString());
    if (filters?.maxPrice) queryParams.append('max_price', filters.maxPrice.toString());
    if (filters?.search) queryParams.append('search', filters.search);

    const queryString = queryParams.toString();
    const endpoint = queryString ? `/products/?${queryString}` : '/products/';

    // Django REST Framework devuelve los datos directamente, no envueltos en 'data'
    const response = await this.get<any>(endpoint);

    // Adaptar la respuesta de Django a nuestro formato esperado
    return {
      data: response.results || response, // Django puede devolver 'results' para paginación
      total: response.count || (Array.isArray(response) ? response.length : 0),
      page: response.page || 1,
      limit: response.page_size || 20,
      totalPages: response.total_pages || 1
    };
  }

  // Obtener un producto por ID
  async getProductById(id: number): Promise<ApiResponse<Product>> {
    const product = await this.get<Product>(`/products/${id}/`);
    return {
      data: product,
      message: 'Producto obtenido correctamente',
      success: true
    };
  }

  // Crear un nuevo producto
  async createProduct(productData: CreateProductRequest): Promise<ApiResponse<Product>> {
    const product = await this.post<Product>('/products/', productData);
    return {
      data: product,
      message: 'Producto creado correctamente',
      success: true
    };
  }

  // Actualizar un producto existente
  async updateProduct(id: number, productData: UpdateProductRequest): Promise<ApiResponse<Product>> {
    const product = await this.put<Product>(`/products/${id}/`, productData);
    return {
      data: product,
      message: 'Producto actualizado correctamente',
      success: true
    };
  }

  // Eliminar un producto
  async deleteProduct(id: number): Promise<ApiResponse<null>> {
    await this.delete<null>(`/products/${id}/`);
    return {
      data: null,
      message: 'Producto eliminado correctamente',
      success: true
    };
  }

  // Obtener todas las categorías
  async getCategories(): Promise<ApiResponse<Category[]>> {
    const response = await this.get<any>('/categories/');
    const data = response.results || response; 
    return {
      data,
      message: 'Categorías obtenidas correctamente',
      success: true
    };
  }
  // Obtener productos por categoría
  async getProductsByCategory(categoryId: number): Promise<PaginatedResponse<Product>> {
    const response = await this.get<any>(`/categories/${categoryId}/products/`);
    return {
      data: response.results || response,
      total: response.count || (Array.isArray(response) ? response.length : 0),
      page: response.page || 1,
      limit: response.page_size || 20,
      totalPages: response.total_pages || 1
    };
  }

  // Nuevo método para búsqueda avanzada
  async searchProducts(query: string, filters?: ProductFilters): Promise<PaginatedResponse<Product>> {
    const queryParams = new URLSearchParams();
    queryParams.append('q', query);

    if (filters?.category) queryParams.append('category', filters.category);
    if (filters?.minPrice) queryParams.append('min_price', filters.minPrice.toString());
    if (filters?.maxPrice) queryParams.append('max_price', filters.maxPrice.toString());

    const response = await this.get<any>(`/products/search/?${queryParams.toString()}`);
    return {
      data: response.results || response,
      total: response.count || (Array.isArray(response) ? response.length : 0),
      page: 1,
      limit: 20,
      totalPages: 1
    };
  }
}

// Instancia del servicio para usar en la aplicación
export const productService = new ProductService();

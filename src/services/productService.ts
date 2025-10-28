import { ApiService } from "../api/axios";
import type { 
  Product, 
  Category,
  ProductFilters,
  CreateProductRequest,
  UpdateProductRequest,
  ApiResponse,
  PaginatedResponse,
  DjangoPaginatedResponse
} from "../types/ProductTypes";

// Tipo para respuestas de búsqueda
interface SearchResponse {
  results: Product[];
  count: number;
  next?: string | null;
  previous?: string | null;
}

// Tipo para crear categorías
interface CreateCategoryRequest {
  name: string;
  description?: string;
}

export class ProductService extends ApiService {
  
  async getProducts(filters?: ProductFilters): Promise<PaginatedResponse<Product>> {
    const queryParams = new URLSearchParams();

    // Agregar filtros a los parámetros de consulta
    if (filters?.category) queryParams.append('category', filters.category);
    if (filters?.minPrice) queryParams.append('min_price', filters.minPrice.toString());
    if (filters?.maxPrice) queryParams.append('max_price', filters.maxPrice.toString());
    if (filters?.search) queryParams.append('search', filters.search);
    if (filters?.page) queryParams.append('page', filters.page.toString());
    if (filters?.page_size) queryParams.append('page_size', filters.page_size.toString());

    const queryString = queryParams.toString();
    const endpoint = queryString ? `/products/?${queryString}` : '/products/';

    try {
      const response = await this.get<DjangoPaginatedResponse<Product>>(endpoint);
      return this.adaptPaginatedResponse(response);
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

  // Obtener un producto por ID
  async getProductById(id: number): Promise<ApiResponse<Product>> {
    try {
      const data = await this.get<Product>(`/products/${id}/`);
      return {
        data,
        message: 'Producto obtenido correctamente',
        success: true
      };
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error);
      throw error;
    }
  }

  // Crear un nuevo producto
  async createProduct(productData: CreateProductRequest): Promise<ApiResponse<Product>> {
    try {
      const data = await this.post<Product, CreateProductRequest>('/products/', productData);
      return {
        data,
        message: 'Producto creado correctamente',
        success: true
      };
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  }

  // Actualizar un producto existente
  async updateProduct(id: number, productData: UpdateProductRequest): Promise<ApiResponse<Product>> {
    try {
      const data = await this.put<Product, UpdateProductRequest>(`/products/${id}/`, productData);
      return {
        data,
        message: 'Producto actualizado correctamente',
        success: true
      };
    } catch (error) {
      console.error(`Error updating product ${id}:`, error);
      throw error;
    }
  }

  // Eliminar un producto
  async deleteProduct(id: number): Promise<ApiResponse<void>> {
    try {
      await this.delete<void>(`/products/${id}/`);
      return {
        data: undefined,
        message: 'Producto eliminado correctamente',
        success: true
      };
    } catch (error) {
      console.error(`Error deleting product ${id}:`, error);
      throw error;
    }
  }

  // Obtener todas las categorías
  async getCategories(): Promise<ApiResponse<Category[]>> {
    try {
      const data = await this.get<DjangoPaginatedResponse<Category> | Category[]>('/categories/');
      
      // Adaptar la respuesta según el formato
      let categories: Category[];
      if (Array.isArray(data)) {
        categories = data;
      } else if (data && 'results' in data) {
        categories = data.results;
      } else {
        categories = [];
      }

      return {
        data: categories,
        message: 'Categorías obtenidas correctamente',
        success: true
      };
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  }

  // Crear una nueva categoría
  async createCategory(categoryData: CreateCategoryRequest): Promise<ApiResponse<Category>> {
    try {
      const data = await this.post<Category, CreateCategoryRequest>('/categories/', categoryData);
      return {
        data,
        message: 'Categoría creada correctamente',
        success: true
      };
    } catch (error) {
      console.error('Error creating category:', error);
      throw error;
    }
  }

  // Actualizar una categoría existente
  async updateCategory(id: number, categoryData: Partial<Category>): Promise<ApiResponse<Category>> {
    try {
      const data = await this.put<Category, Partial<Category>>(`/categories/${id}/`, categoryData);
      return {
        data,
        message: 'Categoría actualizada correctamente',
        success: true
      };
    } catch (error) {
      console.error(`Error updating category ${id}:`, error);
      throw error;
    }
  }

  // Eliminar una categoría
  async deleteCategory(id: number): Promise<ApiResponse<void>> {
    try {
      await this.delete<void>(`/categories/${id}/`);
      return {
        data: undefined,
        message: 'Categoría eliminada correctamente',
        success: true
      };
    } catch (error) {
      console.error(`Error deleting category ${id}:`, error);
      throw error;
    }
  }

  // Obtener productos por categoría
  async getProductsByCategory(categoryId: number, filters?: ProductFilters): Promise<PaginatedResponse<Product>> {
    const queryParams = new URLSearchParams();
    
    if (filters?.minPrice) queryParams.append('min_price', filters.minPrice.toString());
    if (filters?.maxPrice) queryParams.append('max_price', filters.maxPrice.toString());
    if (filters?.search) queryParams.append('search', filters.search);
    if (filters?.page) queryParams.append('page', filters.page.toString());
    if (filters?.page_size) queryParams.append('page_size', filters.page_size.toString());

    const queryString = queryParams.toString();
    const endpoint = queryString 
      ? `/categories/${categoryId}/products/?${queryString}`
      : `/categories/${categoryId}/products/`;

    try {
      const response = await this.get<DjangoPaginatedResponse<Product>>(endpoint);
      return this.adaptPaginatedResponse(response);
    } catch (error) {
      console.error(`Error fetching products for category ${categoryId}:`, error);
      throw error;
    }
  }

  // Búsqueda avanzada
  async searchProducts(query: string, filters?: ProductFilters): Promise<PaginatedResponse<Product>> {
    const queryParams = new URLSearchParams();
    queryParams.append('q', query);

    if (filters?.category) queryParams.append('category', filters.category);
    if (filters?.minPrice) queryParams.append('min_price', filters.minPrice.toString());
    if (filters?.maxPrice) queryParams.append('max_price', filters.maxPrice.toString());
    if (filters?.page) queryParams.append('page', filters.page.toString());
    if (filters?.page_size) queryParams.append('page_size', filters.page_size.toString());

    try {
      const response = await this.get<SearchResponse>(
        `/products/search/?${queryParams.toString()}`
      );
      return this.adaptSearchResponse(response);
    } catch (error) {
      console.error('Error searching products:', error);
      throw error;
    }
  }

  // Método auxiliar para adaptar respuestas paginadas de Django
  private adaptPaginatedResponse<T>(response: DjangoPaginatedResponse<T>): PaginatedResponse<T> {
    const pageSize = response.results.length > 0 ? response.results.length : 20;
    const currentPage = this.extractPageFromUrl(response.next || response.previous) || 1;
    
    return {
      data: response.results,
      total: response.count,
      page: currentPage,
      limit: pageSize,
      totalPages: Math.ceil(response.count / pageSize)
    };
  }

  // Método auxiliar para adaptar respuestas de búsqueda
  private adaptSearchResponse(response: SearchResponse): PaginatedResponse<Product> {
    const pageSize = response.results.length > 0 ? response.results.length : 20;
    const currentPage = this.extractPageFromUrl(response.next || response.previous) || 1;
    
    return {
      data: response.results,
      total: response.count,
      page: currentPage,
      limit: pageSize,
      totalPages: Math.ceil(response.count / pageSize)
    };
  }

  // Método auxiliar para extraer el número de página de la URL
  private extractPageFromUrl(url: string | null): number | null {
    if (!url) return null;
    
    try {
      const urlObj = new URL(url);
      const pageParam = urlObj.searchParams.get('page');
      return pageParam ? parseInt(pageParam, 10) : null;
    } catch {
      return null;
    }
  }
}

// Instancia del servicio para usar en la aplicación
export const productService = new ProductService();
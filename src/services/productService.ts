// En ProductService.ts - completamente tipado sin any, sin tests
import { ApiService } from "../api/axios";
import type { 
  Product, 
  Category,
  ProductFilters,
  CreateProductRequest,
  UpdateProductRequest,
  ApiResponse,
  PaginatedResponse,
  DjangoPaginatedResponse,
  SearchResponse,
  CreateCategoryRequest,
  DjangoProductCreateRequest
} from "../types/ProductTypes";

export class ProductService extends ApiService {
  
  async getProducts(filters?: ProductFilters): Promise<PaginatedResponse<Product>> {
    const queryParams = new URLSearchParams();

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

  async createProduct(productData: CreateProductRequest): Promise<ApiResponse<Product>> {
    try {
      console.log('🔍 INICIANDO CREACIÓN DE PRODUCTO...');
      console.log('📤 Datos recibidos del formulario:', productData);
      
      const categoriesResponse = await this.getCategories();
      console.log('📋 Categorías obtenidas:', categoriesResponse.data);
      
      const categories = categoriesResponse.data;
      
      // Convertir category de string a number
      const categoryId = parseInt(productData.category);
      if (isNaN(categoryId)) {
        throw new Error(`ID de categoría inválido: ${productData.category}`);
      }

      // Verificar que la categoría exista
      const category = categories.find(cat => cat.id === categoryId);
      if (!category) {
        const availableCategories = categories.map(c => `${c.id}: ${c.name}`).join(', ');
        throw new Error(`Categoría con ID "${categoryId}" no encontrada. Categorías disponibles: ${availableCategories}`);
      }

      console.log('✅ Categoría encontrada:', category);

      // DATOS CORREGIDOS PARA DJANGO
      const djangoData: DjangoProductCreateRequest = {
        name: productData.name.trim(),
        description: productData.description.trim(),
        price: parseFloat(productData.price.toString()).toFixed(2), // Asegurar formato string
        category: categoryId, // Número (ID de categoría)
        stock: parseInt(productData.stock.toString()),
        image: productData.image || null,
      };

      console.log('📤 Enviando datos a Django:', djangoData);
      console.log('📋 Tipos de datos enviados:', {
        name: typeof djangoData.name,
        description: typeof djangoData.description,
        price: typeof djangoData.price + ' - valor: ' + djangoData.price,
        category: typeof djangoData.category + ' - valor: ' + djangoData.category,
        stock: typeof djangoData.stock + ' - valor: ' + djangoData.stock,
        image: typeof djangoData.image
      });

      const data = await this.post<Product, DjangoProductCreateRequest>('/products/', djangoData);
      
      console.log('✅ Producto creado exitosamente:', data);
      
      return {
        data,
        message: 'Producto creado correctamente',
        success: true
      };
    } catch (error) {
      console.error('❌ Error completo en createProduct:', error);
      
      // ! Activar para más detalles del error de Axios
      // if (error.response) {
      //   console.error('📊 Datos del error:', {
      //     status: error.response.status,
      //     data: error.response.data,
      //     headers: error.response.headers
      //   });
      // }
      
      throw error;
    }
  }

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

  async getCategories(): Promise<ApiResponse<Category[]>> {
    try {
      const data = await this.get<DjangoPaginatedResponse<Category> | Category[]>('/categories/');
      
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

  private extractPageFromUrl(url: string | null | undefined): number | null {
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

export const productService = new ProductService();
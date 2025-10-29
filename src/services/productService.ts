// En ProductService.ts - completamente tipado sin any
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
  DjangoProductCreateRequest,
  SimpleTestResponse,
  DebugProductResponse,
  TestPostData
} from "../types/ProductTypes";

interface ConnectionTestResult {
  get: SimpleTestResponse;
  post: SimpleTestResponse;
}

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
      
      const categoriesResponse = await this.getCategories();
      console.log('📋 Categorías obtenidas:', categoriesResponse.data);
      
      const categories = categoriesResponse.data;
      const category = categories.find(cat => cat.name === productData.category);
      
      if (!category) {
        const availableCategories = categories.map(c => c.name).join(', ');
        throw new Error(`Categoría "${productData.category}" no encontrada. Categorías disponibles: ${availableCategories}`);
      }

      console.log('✅ Categoría encontrada:', category);

      const djangoData: DjangoProductCreateRequest = {
        name: productData.name,
        description: productData.description,
        price: productData.price.toString(),
        category_id: category.id,
        stock: productData.stock,
        image: productData.image || null,
      };

      console.log('📤 Enviando datos a Django:', djangoData);

      const data = await this.post<Product, DjangoProductCreateRequest>('/products/', djangoData);
      
      console.log('✅ Producto creado exitosamente:', data);
      
      return {
        data,
        message: 'Producto creado correctamente',
        success: true
      };
    } catch (error) {
      console.error('❌ Error completo en createProduct:');
      this.logError(error);
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

  async testConnection(): Promise<ConnectionTestResult> {
    try {
      console.log('🧪 Probando conexión con Django...');
      
      const getResponse = await this.get<SimpleTestResponse>('/products/simple-test/');
      
      const postData: TestPostData = {
        test: 'datos de prueba',
        number: 123
      };
      const postResponse = await this.post<SimpleTestResponse, TestPostData>('/products/simple-test/', postData);
      
      return {
        get: getResponse,
        post: postResponse
      };
      
    } catch (error) {
      console.error('❌ Error de conexión:');
      this.logError(error);
      throw error;
    }
  }

  async testDebugCreate(productData: CreateProductRequest): Promise<ApiResponse<Product>> {
    try {
      const categoriesResponse = await this.getCategories();
      const categories = categoriesResponse.data;
      const category = categories.find(cat => cat.name === productData.category);
      
      if (!category) {
        const availableCategories = categories.map(c => c.name).join(', ');
        throw new Error(`Categoría "${productData.category}" no encontrada. Categorías disponibles: ${availableCategories}`);
      }

      const testData: DjangoProductCreateRequest = {
        name: productData.name,
        description: productData.description,
        price: productData.price.toString(),
        category_id: category.id,
        stock: productData.stock,
        image: productData.image || null,
      };

      console.log('🧪 Probando con endpoint de debug...');
      
      const response = await this.post<DebugProductResponse, DjangoProductCreateRequest>('/products/debug/create-product/', testData);
      
      console.log('✅ Respuesta del debug:', response);
      
      if (response.product) {
        return {
          data: response.product,
          message: response.message || 'Producto creado exitosamente',
          success: true
        };
      } else {
        throw new Error(response.message || 'Error en la creación del producto');
      }
      
    } catch (error) {
      console.error('❌ Error en debug:');
      this.logError(error);
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

  private logError(error: unknown): void {
    if (error instanceof Error) {
      console.error('Tipo:', error.constructor.name);
      console.error('Mensaje:', error.message);
      console.error('Stack:', error.stack);
    } else {
      console.error('Error desconocido:', error);
    }
  }
}

export const productService = new ProductService();
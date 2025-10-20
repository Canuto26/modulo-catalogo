import { config, log } from '../config/environment';
import { productService } from './productService';
import { mockProductService } from './mockProductService';
import type{ 
  Product, 
  Category, 
  ApiResponse, 
  PaginatedResponse, 
  ProductFilters, 
  CreateProductRequest, 
  UpdateProductRequest 
} from '../types';

// Adaptador que decide si usar mock o API real
export class ProductServiceAdapter {
  private getService() {
    if (config.useMockData) {
      log('Usando servicio mock');
      return mockProductService;
    } else {
      log('Usando servicio real de API');
      return productService;
    }
  }

  async getProducts(filters?: ProductFilters): Promise<PaginatedResponse<Product>> {
    log('Obteniendo productos', { filters, useMock: config.useMockData });
    return this.getService().getProducts(filters);
  }

  async getProductById(id: number): Promise<ApiResponse<Product>> {
    log(`Obteniendo producto con ID: ${id}`, { useMock: config.useMockData });
    return this.getService().getProductById(id);
  }

  async createProduct(productData: CreateProductRequest): Promise<ApiResponse<Product>> {
    log('Creando producto', { productData, useMock: config.useMockData });
    return this.getService().createProduct(productData);
  }

  async updateProduct(id: number, productData: UpdateProductRequest): Promise<ApiResponse<Product>> {
    log(`Actualizando producto con ID: ${id}`, { productData, useMock: config.useMockData });
    return this.getService().updateProduct(id, productData);
  }

  async deleteProduct(id: number): Promise<ApiResponse<null>> {
    log(`Eliminando producto con ID: ${id}`, { useMock: config.useMockData });
    return this.getService().deleteProduct(id);
  }

  async getCategories(): Promise<ApiResponse<Category[]>> {
    log('Obteniendo categorías', { useMock: config.useMockData });
    return this.getService().getCategories();
  }

  async getProductsByCategory(categoryId: number): Promise<PaginatedResponse<Product>> {
    log(`Obteniendo productos de categoría: ${categoryId}`, { useMock: config.useMockData });
    return this.getService().getProductsByCategory(categoryId);
  }

  // Métodos específicos para mock (solo disponibles cuando useMockData = true)
  resetMockData(): void {
    if (config.useMockData && 'resetData' in mockProductService) {
      (mockProductService as any).resetData();
      log('Datos mock reseteados');
    } else {
      console.warn('resetMockData solo está disponible cuando useMockData = true');
    }
  }

  getAllMockProducts(): Product[] {
    if (config.useMockData && 'getAllProducts' in mockProductService) {
      return (mockProductService as any).getAllProducts();
    } else {
      console.warn('getAllMockProducts solo está disponible cuando useMockData = true');
      return [];
    }
  }
}

// Instancia del adaptador
export const productServiceAdapter = new ProductServiceAdapter();

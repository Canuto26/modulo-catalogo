import { 
  Product, 
  Category, 
  ApiResponse, 
  PaginatedResponse, 
  ProductFilters, 
  CreateProductRequest, 
  UpdateProductRequest 
} from '../types';
import { mockProducts, mockCategories, simulateNetworkDelay, simulateRandomError } from '../data/mockData';

// Servicio mock que simula el comportamiento de la API real
export class MockProductService {
  private products: Product[] = [...mockProducts];
  private categories: Category[] = [...mockCategories];
  private nextId = Math.max(...mockProducts.map(p => p.id)) + 1;

  // Simular obtener productos con filtros
  async getProducts(filters?: ProductFilters): Promise<PaginatedResponse<Product>> {
    await simulateNetworkDelay(800); // Simular delay de red
    
    // Simular error ocasional (opcional)
    if (simulateRandomError(0.05)) {
      throw new Error('Error de red simulado');
    }

    let filteredProducts = [...this.products];

    // Aplicar filtros
    if (filters?.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredProducts = filteredProducts.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
      );
    }

    if (filters?.category) {
      filteredProducts = filteredProducts.filter(product =>
        product.category === filters.category
      );
    }

    if (filters?.minPrice !== undefined) {
      filteredProducts = filteredProducts.filter(product =>
        product.price >= filters.minPrice!
      );
    }

    if (filters?.maxPrice !== undefined) {
      filteredProducts = filteredProducts.filter(product =>
        product.price <= filters.maxPrice!
      );
    }

    return {
      data: filteredProducts,
      total: filteredProducts.length,
      page: 1,
      limit: 50,
      totalPages: 1,
    };
  }

  // Simular obtener producto por ID
  async getProductById(id: number): Promise<ApiResponse<Product>> {
    await simulateNetworkDelay(500);
    
    if (simulateRandomError(0.02)) {
      throw new Error('Producto no encontrado');
    }

    const product = this.products.find(p => p.id === id);
    
    if (!product) {
      throw new Error(`Producto con ID ${id} no encontrado`);
    }

    return {
      data: product,
      message: 'Producto obtenido exitosamente',
      success: true,
    };
  }

  // Simular crear producto
  async createProduct(productData: CreateProductRequest): Promise<ApiResponse<Product>> {
    await simulateNetworkDelay(1000);
    
    if (simulateRandomError(0.03)) {
      throw new Error('Error al crear producto');
    }

    const newProduct: Product = {
      id: this.nextId++,
      ...productData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.products.push(newProduct);

    return {
      data: newProduct,
      message: 'Producto creado exitosamente',
      success: true,
    };
  }

  // Simular actualizar producto
  async updateProduct(id: number, productData: UpdateProductRequest): Promise<ApiResponse<Product>> {
    await simulateNetworkDelay(800);
    
    if (simulateRandomError(0.02)) {
      throw new Error('Error al actualizar producto');
    }

    const productIndex = this.products.findIndex(p => p.id === id);
    
    if (productIndex === -1) {
      throw new Error(`Producto con ID ${id} no encontrado`);
    }

    const updatedProduct: Product = {
      ...this.products[productIndex],
      ...productData,
      updatedAt: new Date().toISOString(),
    };

    this.products[productIndex] = updatedProduct;

    return {
      data: updatedProduct,
      message: 'Producto actualizado exitosamente',
      success: true,
    };
  }

  // Simular eliminar producto
  async deleteProduct(id: number): Promise<ApiResponse<null>> {
    await simulateNetworkDelay(600);
    
    if (simulateRandomError(0.02)) {
      throw new Error('Error al eliminar producto');
    }

    const productIndex = this.products.findIndex(p => p.id === id);
    
    if (productIndex === -1) {
      throw new Error(`Producto con ID ${id} no encontrado`);
    }

    this.products.splice(productIndex, 1);

    return {
      data: null,
      message: 'Producto eliminado exitosamente',
      success: true,
    };
  }

  // Simular obtener categorías
  async getCategories(): Promise<ApiResponse<Category[]>> {
    await simulateNetworkDelay(300);
    
    if (simulateRandomError(0.01)) {
      throw new Error('Error al cargar categorías');
    }

    return {
      data: this.categories,
      message: 'Categorías obtenidas exitosamente',
      success: true,
    };
  }

  // Simular obtener productos por categoría
  async getProductsByCategory(categoryId: number): Promise<PaginatedResponse<Product>> {
    await simulateNetworkDelay(700);
    
    const category = this.categories.find(c => c.id === categoryId);
    if (!category) {
      throw new Error(`Categoría con ID ${categoryId} no encontrada`);
    }

    const productsInCategory = this.products.filter(p => p.category === category.name);

    return {
      data: productsInCategory,
      total: productsInCategory.length,
      page: 1,
      limit: 50,
      totalPages: 1,
    };
  }

  // Método para resetear datos (útil para testing)
  resetData(): void {
    this.products = [...mockProducts];
    this.categories = [...mockCategories];
    this.nextId = Math.max(...mockProducts.map(p => p.id)) + 1;
  }

  // Método para obtener todos los productos (útil para debugging)
  getAllProducts(): Product[] {
    return [...this.products];
  }
}

// Instancia del servicio mock
export const mockProductService = new MockProductService();

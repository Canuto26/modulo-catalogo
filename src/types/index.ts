// Tipos principales para el módulo de productos

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  stock: number;
  createdAt: string;
  updatedAt: string;
  sku?: string;
}

export interface Category {
  id: number;
  name: string;
  description?: string;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
}

export interface CreateProductRequest {
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  stock: number;
}

export interface UpdateProductRequest extends Partial<CreateProductRequest> {
  id: number;
}

// Estados de carga
export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

// Estados específicos para productos
export interface ProductsState extends LoadingState {
  products: Product[];
  categories: Category[];
  filters: ProductFilters;
  selectedProduct: Product | null;
}

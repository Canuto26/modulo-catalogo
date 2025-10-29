// Tipos base para respuestas
export interface ApiResponse<T> {
  data: T
  message?: string
  success?: boolean
  detail?: string
}

// Tipos para paginación usada en la app (frontend)
export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

// Product Module Types
export interface Product {
  id: number
  name: string
  description: string
  price: number
  category: string
  image?: string
  stock: number
  createdAt: string
  updatedAt: string
}

export interface Category {
  id: number
  name: string
  description?: string
}

// Filtros y requests
export interface ProductFilters {
  category?: string
  minPrice?: number
  maxPrice?: number
  search?: string
  page?: number
  page_size?: number
}

export interface CreateProductRequest {
  name: string
  description: string
  price: number
  category: string
  image?: string
  stock: number
}

export type UpdateProductRequest = Partial<CreateProductRequest>

// Estados y props de UI
export interface LoadingState {
  isLoading: boolean
  error: string | null
}

export interface ProductsState extends LoadingState {
  products: Product[]
  categories: Category[]
  filters: ProductFilters
  selectedProduct: Product | null
}

export interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large'
  message?: string
}

export interface ProductCardProps {
  product: Product
  onEdit?: (product: Product) => void
  onDelete?: (productId: number) => void
  onView?: (product: Product) => void
}

export interface ProductFiltersProps {
  filters: ProductFilters
  categories: Category[]
  onFiltersChange: (filters: Partial<ProductFilters>) => void
  onClearFilters: () => void
}

export interface ProductListProps {
  products: Product[]
  loading: boolean
  error: string | null
  onEdit?: (product: Product) => void
  onDelete?: (productId: number) => void
  onView?: (product: Product) => void
}

export interface ProductDetailScreenProps {
  productId: number
}

export interface DjangoPaginatedResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

// AGREGAR esta interfaz para respuestas de búsqueda
export interface SearchResponse {
  results: Product[]
  count: number
  next: string | null
  previous: string | null
}

// AGREGAR esta interfaz para crear categorías
export interface CreateCategoryRequest {
  name: string
  description?: string
}
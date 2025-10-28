import React from 'react';
import type { Product } from '../types/ProductTypes';
import { ProductCard } from './ProductCard';

interface ProductListProps {
  products: Product[];
  loading: boolean;
  error: string | null;
  onEdit?: (product: Product) => void;
  onDelete?: (productId: number) => void;
  onView?: (product: Product) => void;
}

export const ProductList: React.FC<ProductListProps> = ({
  products,
  loading,
  error,
  onEdit,
  onDelete,
  onView,
}) => {
  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Cargando productos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h3>Error al cargar productos</h3>
        <p>{error}</p>
        <button 
          className="btn btn-primary"
          onClick={() => window.location.reload()}
        >
          Reintentar
        </button>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="empty-container">
        <h3>No hay productos disponibles</h3>
        <p>No se encontraron productos con los filtros aplicados.</p>
      </div>
    );
  }

  return (
    <div className="product-list">
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onEdit={onEdit}
            onDelete={onDelete}
            onView={onView}
          />
        ))}
      </div>
    </div>
  );
};

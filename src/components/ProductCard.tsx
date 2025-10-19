import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onEdit?: (product: Product) => void;
  onDelete?: (productId: number) => void;
  onView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onEdit, 
  onDelete, 
  onView 
}) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-CO');
  };

  return (
    <div className="product-card">
      <div className="product-image">
        {product.image ? (
          <img src={product.image} alt={product.name} />
        ) : (
          <div className="no-image">
            <span>Sin imagen</span>
          </div>
        )}
      </div>
      
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-details">
          <span className="product-price">{formatPrice(product.price)}</span>
          <span className="product-category">{product.category}</span>
          <span className="product-stock">
            Stock: {product.stock}
          </span>
        </div>
        <div className="product-meta">
          <small>Creado: {formatDate(product.createdAt)}</small>
        </div>
      </div>
      
      <div className="product-actions">
        {onView && (
          <button 
            className="btn btn-primary"
            onClick={() => onView(product)}
          >
            Ver
          </button>
        )}
        {onEdit && (
          <button 
            className="btn btn-secondary"
            onClick={() => onEdit(product)}
          >
            Editar
          </button>
        )}
        {onDelete && (
          <button 
            className="btn btn-danger"
            onClick={() => onDelete(product.id)}
          >
            Eliminar
          </button>
        )}
      </div>
    </div>
  );
};

import React from 'react';
import { useProduct } from '../hooks/useProduct';
import { LoadingSpinner } from '../components';

interface ProductDetailScreenProps {
  productId: number;
}

export const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({ 
  productId 
}) => {
  const { product, loading, updateProduct, deleteProduct } = useProduct(productId);

  const handleUpdateProduct = async () => {
    if (!product) return;
    
    try {
      const updatedData = {
        id: product.id,
        name: product.name + ' (Actualizado)',
        description: product.description,
        price: product.price,
        category: product.category,
        stock: product.stock,
      };
      
      await updateProduct(product.id, updatedData);
      alert('Producto actualizado exitosamente');
    } catch (error) {
      alert('Error al actualizar el producto. Error: ' + error);
    }
  };

  const handleDeleteProduct = async () => {
    if (!product) return;
    
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      try {
        await deleteProduct(product.id);
        alert('Producto eliminado exitosamente');
        // Aquí se podría navegar de vuelta a la lista de productos
      } catch (error) {
        alert('Error al eliminar el producto. Error: ' + error);
      }
    }
  };

  if (loading.isLoading) {
    return <LoadingSpinner message="Cargando producto..." />;
  }

  if (loading.error) {
    return (
      <div className="error-container">
        <h2>Error al cargar el producto</h2>
        <p>{loading.error}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="not-found">
        <h2>Producto no encontrado</h2>
        <p>El producto que buscas no existe o ha sido eliminado.</p>
      </div>
    );
  }

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
    <div className="product-detail-screen">
      <div className="product-detail-header">
        <h1>{product.name}</h1>
        <div className="product-actions">
          <button 
            className="btn btn-secondary"
            onClick={handleUpdateProduct}
          >
            Actualizar
          </button>
          <button 
            className="btn btn-danger"
            onClick={handleDeleteProduct}
          >
            Eliminar
          </button>
        </div>
      </div>

      <div className="product-detail-content">
        <div className="product-image-section">
          {product.image ? (
            <img 
              src={product.image} 
              alt={product.name}
              className="product-detail-image"
            />
          ) : (
            <div className="no-image-large">
              <span>Sin imagen disponible</span>
            </div>
          )}
        </div>

        <div className="product-info-section">
          <div className="product-basic-info">
            <h2>Información del Producto</h2>
            <p className="product-description">{product.description}</p>
            
            <div className="product-details-grid">
              <div className="detail-item">
                <label>Precio:</label>
                <span className="price">{formatPrice(product.price)}</span>
              </div>
              
              <div className="detail-item">
                <label>Categoría:</label>
                <span>{product.category}</span>
              </div>
              
              <div className="detail-item">
                <label>Stock disponible:</label>
                <span className={product.stock > 0 ? 'in-stock' : 'out-of-stock'}>
                  {product.stock} unidades
                </span>
              </div>
            </div>
          </div>

          <div className="product-meta-info">
            <h3>Información adicional</h3>
            <div className="meta-details">
              <div className="meta-item">
                <label>ID del producto:</label>
                <span>{product.id}</span>
              </div>
              
              <div className="meta-item">
                <label>Fecha de creación:</label>
                <span>{formatDate(product.createdAt)}</span>
              </div>
              
              <div className="meta-item">
                <label>Última actualización:</label>
                <span>{formatDate(product.updatedAt)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

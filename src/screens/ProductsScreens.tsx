import React, { useState } from 'react';
import type { Product } from '../types/ProductTypes';
import {  useProducts } from '../hooks/useProduct';
import { useCategories } from '../hooks/useCategories';
import { ProductList, ProductFiltersComp} from '../components';

interface ProductsScreenProps {
  onViewProduct: (productId: number) => void;
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (productId: number) => void;
}

export const ProductsScreen: React.FC<ProductsScreenProps> = ({ 
  onViewProduct, 
  onEditProduct, 
  onDeleteProduct 
}) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  
  const { 
    products, 
    loading, 
    filters, 
    updateFilters, 
    clearFilters,
    deleteProduct 
  } = useProducts();
  
  const { categories } = useCategories();

  const handleEditProduct = (product: Product) => {
    onEditProduct(product);
  };

  const handleDeleteProduct = async (productId: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      try {
        await deleteProduct(productId);
        onDeleteProduct(productId);
      } catch (error) {
        console.error('Error al eliminar producto:', error);
        alert('Error al eliminar el producto');
      }
    }
  };

  const handleViewProduct = (product: Product) => {
    onViewProduct(product.id);
  };

  const handleCreateProduct = () => {
    // Aquí podrías navegar a una pantalla de creación o abrir un modal
    console.log('Crear nuevo producto');
  };

  return (
    <div className="products-screen">
      
      <div className="screen-header">
        <h1>Catálogo de Productos</h1>
        <div className="header-actions">
          <button 
            className="btn btn-secondary"
            onClick={() => setShowFilters(!showFilters)}
          >
            {showFilters ? 'Ocultar filtros' : 'Mostrar filtros'}
          </button>
          <button 
            className="btn btn-primary"
            onClick={handleCreateProduct}
          >
            Nuevo Producto
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="filters-section">
          <ProductFiltersComp
            filters={filters}
            categories={categories}
            onFiltersChange={updateFilters}
            onClearFilters={clearFilters}
          />
        </div>
      )}

      <div className="products-content">
        <ProductList
          products={products}
          loading={loading.isLoading}
          error={loading.error}
          onEdit={handleEditProduct}
          onDelete={handleDeleteProduct}
          onView={handleViewProduct}
        />
      </div>

      {selectedProduct && (
        <div className="product-modal">
          <div className="modal-content">
            <h2>{selectedProduct.name}</h2>
            <p>{selectedProduct.description}</p>
            <button onClick={() => setSelectedProduct(null)}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
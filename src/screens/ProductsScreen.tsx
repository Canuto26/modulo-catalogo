import React, { useState } from 'react';
import { Product } from '../types';
import { useProducts } from '../hooks/useProducts';
import { useCategories } from '../hooks/useCategories';
import { ProductList, ProductFilters } from '../components';

export const ProductsScreen: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  
  const { 
    products, 
    loading, 
    filters, 
    updateFilters, 
    clearFilters 
  } = useProducts();
  
  const { categories } = useCategories();

  const handleEditProduct = (product: Product) => {
    console.log('Editar producto:', product);
    // Aquí se abriría un modal o navegaría a una pantalla de edición
  };

  const handleDeleteProduct = (productId: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      console.log('Eliminar producto:', productId);
      // Aquí se llamaría al servicio para eliminar el producto
    }
  };

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
    console.log('Ver producto:', product);
    // Aquí se abriría un modal o navegaría a una pantalla de detalles
  };

  return (
    <div className="products-screen">
      <div className="screen-header">
        <h1>Catálogo de Productos</h1>
        <div className="header-actions">
          <button 
            className="btn btn-primary"
            onClick={() => setShowFilters(!showFilters)}
          >
            {showFilters ? 'Ocultar filtros' : 'Mostrar filtros'}
          </button>
          <button className="btn btn-success">
            Nuevo Producto
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="filters-section">
          <ProductFilters
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
          {/* Aquí se mostraría un modal con los detalles del producto */}
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

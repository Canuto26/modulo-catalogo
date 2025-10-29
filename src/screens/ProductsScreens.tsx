import React, { useState } from 'react';
import type { Product, CreateProductRequest, ProductsScreenProps } from '../types/ProductTypes';
import { useProducts } from '../hooks/useProduct';
import { useCategories } from '../hooks/useCategories';
import { ProductList, ProductFiltersComp, ProductForm } from '../components';


export const ProductsScreen: React.FC<ProductsScreenProps> = ({ 
  onViewProduct, 
  onEditProduct, 
  onDeleteProduct 
}) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  
  const { 
    products, 
    loading, 
    filters, 
    updateFilters, 
    clearFilters,
    deleteProduct,
    createProduct 
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
    setShowCreateForm(true);
  };

  const handleSubmitCreateProduct = async (productData: CreateProductRequest) => {
    try {
      await createProduct(productData);
      setShowCreateForm(false);
      alert('Producto creado exitosamente');
    } catch (error) {
      console.error('Error al crear producto:', error);
      alert('Error al crear el producto: ' + (error instanceof Error ? error.message : 'Error desconocido'));
      throw error; // Re-lanzar el error para que el formulario lo maneje
    }
  };

  const handleCancelCreate = () => {
    setShowCreateForm(false);
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

      {showCreateForm && (
        <ProductForm
          categories={categories}
          onSubmit={handleSubmitCreateProduct}
          onCancel={handleCancelCreate}
          loading={loading.isLoading}
        />
      )}

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
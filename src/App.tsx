import { useState } from 'react';
import { ProductDetailScreen } from './screens/ProductDetailScreen';
import { ProductsScreen } from './screens/ProductsScreens';
import type { Product } from './types/ProductTypes';
import './App.css';

function App() {
  const [currentScreen, setCurrentScreen] = useState<'products' | 'product-detail'>('products');
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

  const handleViewProduct = (productId: number) => {
    setSelectedProductId(productId);
    setCurrentScreen('product-detail');
  };

  const handleBackToProducts = () => {
    setCurrentScreen('products');
    setSelectedProductId(null);
  };

  // Manejar cuando se edita un producto (podría necesitar navegación o estado global)
  const handleEditProduct = (product: Product) => {
    console.log('Editar producto:', product);
    // Aquí podrías navegar a una pantalla de edición o abrir un modal
  };

  // Manejar cuando se elimina un producto
  const handleDeleteProduct = (productId: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      console.log('Eliminar producto:', productId);
      // Aquí podrías llamar al servicio para eliminar el producto
      // Y actualizar el estado si es necesario
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Módulo de Catálogo de Productos</h1>
        <nav className="app-nav">
          <button 
            className={`nav-btn ${currentScreen === 'products' ? 'active' : ''}`}
            onClick={handleBackToProducts}
            disabled={currentScreen === 'products'}
          >
            Lista de Productos
          </button>
          {currentScreen === 'product-detail' && (
            <button 
              className="nav-btn back-btn"
              onClick={handleBackToProducts}
            >
              ← Volver a Productos
            </button>
          )}
        </nav>
      </header>

      <main className="app-main">
        {currentScreen === 'products' && (
          <ProductsScreen 
            onViewProduct={handleViewProduct}
            onEditProduct={handleEditProduct}
            onDeleteProduct={handleDeleteProduct}
          />
        )}
        
        {currentScreen === 'product-detail' && selectedProductId && (
          <ProductDetailScreen productId={selectedProductId} />
        )}
      </main>

      <footer className="app-footer">
        <p>© 2024 - Equipo de desarrollo</p>
      </footer>
    </div>
  );
}

export default App;
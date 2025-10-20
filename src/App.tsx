import React, { useState } from 'react';
import { ProductsScreen, ProductDetailScreen } from './screens';
import { TestingPanel } from './components/TestingPanel';
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

  return (
    <div className="app">
      <header className="app-header">
        <h1>Módulo de Catálogo de Productos</h1>
        <nav className="app-nav">
          <button 
            className={`nav-btn ${currentScreen === 'products' ? 'active' : ''}`}
            onClick={() => setCurrentScreen('products')}
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
          <ProductsScreen />
        )}
        
        {currentScreen === 'product-detail' && selectedProductId && (
          <ProductDetailScreen productId={selectedProductId} />
        )}
      </main>

      <footer className="app-footer">
        <p>Equipo de desarrollo</p>
      </footer>

      <TestingPanel />
    </div>
  );
}

export default App;

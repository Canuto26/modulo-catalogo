import React, { useState } from 'react';
import { config, toggleMockData } from '../config/environment';
import { productServiceAdapter } from '../services/productServiceAdapter';
import { mockProductService } from '../services/mockProductService';

export const TestingPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleToggleMock = () => {
    toggleMockData(!config.useMockData);
    setIsOpen(false);
    // Recargar la página para aplicar cambios
    window.location.reload();
  };

  const handleResetMockData = () => {
    if (config.useMockData) {
      productServiceAdapter.resetMockData();
      alert('Datos mock reseteados');
    }
  };

  const handleAddTestProduct = () => {
    if (config.useMockData) {
      const testProduct = {
        name: `Producto Test ${Date.now()}`,
        description: 'Producto creado para testing',
        price: Math.floor(Math.random() * 1000000) + 100000,
        category: 'Electrónicos',
        stock: Math.floor(Math.random() * 50) + 1,
      };
      
      productServiceAdapter.createProduct(testProduct)
        .then(() => {
          alert('Producto de prueba creado');
          window.location.reload();
        })
        .catch(() => {
          alert('Error al crear producto de prueba');
        });
    }
  };

  if (!isOpen) {
    return (
      <div className="testing-panel-toggle">
        <button 
          className="btn btn-secondary"
          onClick={() => setIsOpen(true)}
          title="Panel de Testing"
        >
          🧪 Testing
        </button>
      </div>
    );
  }

  return (
    <div className="testing-panel">
      <div className="testing-panel-header">
        <h3>🧪 Panel de Testing</h3>
        <button 
          className="btn btn-secondary"
          onClick={() => setIsOpen(false)}
        >
          ✕
        </button>
      </div>

      <div className="testing-panel-content">
        <div className="testing-section">
          <h4>Configuración de Datos</h4>
          <div className="testing-controls">
            <div className="control-group">
              <label>
                <input 
                  type="checkbox" 
                  checked={config.useMockData}
                  onChange={handleToggleMock}
                />
                Usar datos mock (actualmente: {config.useMockData ? 'SÍ' : 'NO'})
              </label>
            </div>
            
            <div className="control-group">
              <button 
                className="btn btn-primary"
                onClick={handleToggleMock}
              >
                {config.useMockData ? 'Cambiar a API Real' : 'Cambiar a Mock'}
              </button>
            </div>
          </div>
        </div>

        {config.useMockData && (
          <div className="testing-section">
            <h4>Controles Mock</h4>
            <div className="testing-controls">
              <button 
                className="btn btn-warning"
                onClick={handleResetMockData}
              >
                🔄 Resetear Datos Mock
              </button>
              
              <button 
                className="btn btn-success"
                onClick={handleAddTestProduct}
              >
                ➕ Agregar Producto Test
              </button>
            </div>
          </div>
        )}

        <div className="testing-section">
          <h4>Información del Sistema</h4>
          <div className="system-info">
            <p><strong>Modo:</strong> {config.useMockData ? 'Mock Data' : 'API Real'}</p>
            <p><strong>URL API:</strong> {config.apiBaseUrl}</p>
            <p><strong>Logging:</strong> {config.enableLogging ? 'Habilitado' : 'Deshabilitado'}</p>
            {config.useMockData && (
              <>
                <p><strong>Delay Mock:</strong> {config.mockDelay}ms</p>
                <p><strong>Error Rate:</strong> {(config.errorRate * 100).toFixed(1)}%</p>
              </>
            )}
          </div>
        </div>

        <div className="testing-section">
          <button 
            className="btn btn-secondary"
            onClick={() => setShowAdvanced(!showAdvanced)}
          >
            {showAdvanced ? 'Ocultar' : 'Mostrar'} Opciones Avanzadas
          </button>
          
          {showAdvanced && (
            <div className="advanced-controls">
              <h5>Controles Avanzados</h5>
              <div className="control-group">
                <label>
                  Delay de red (ms):
                  <input 
                    type="number" 
                    value={config.mockDelay}
                    onChange={(e) => {
                      config.mockDelay = parseInt(e.target.value) || 0;
                    }}
                    min="0"
                    max="5000"
                  />
                </label>
              </div>
              
              <div className="control-group">
                <label>
                  Tasa de error (%):
                  <input 
                    type="number" 
                    value={config.errorRate * 100}
                    onChange={(e) => {
                      config.errorRate = (parseInt(e.target.value) || 0) / 100;
                    }}
                    min="0"
                    max="50"
                  />
                </label>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import type { ProductFilters as ProductFiltersType, Category } from '../types/types';

interface ProductFiltersProps {
  filters: ProductFiltersType;
  categories: Category[];
  onFiltersChange: (filters: Partial<ProductFiltersType>) => void;
  onClearFilters: () => void;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  filters,
  categories,
  onFiltersChange,
  onClearFilters,
}) => {
  const handleInputChange = (field: keyof ProductFiltersType, value: string | number) => {
    onFiltersChange({ [field]: value });
  };

  return (
    <div className="product-filters">
      <h3>Filtros</h3>
      
      {/* Campo de búsqueda */}
      <div className="filter-group">
        <label htmlFor="search">Buscar:</label>
        <input
          id="search"
          type="text"
          placeholder="Nombre del producto..."
          value={filters.search || ''}
          onChange={(e) => handleInputChange('search', e.target.value)}
        />
      </div>

      {/* Filtro de categoría */}
      <div className="filter-group">
        <label htmlFor="category">Categoría:</label>
        <select
          id="category"
          value={filters.category || ''}
          onChange={(e) => handleInputChange('category', e.target.value)}
        >
          <option value="">Todas las categorías</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Precio mínimo */}
      <div className="filter-group">
        <label htmlFor="minPrice">Precio mínimo:</label>
        <input
          id="minPrice"
          type="number"
          placeholder="0"
          value={filters.minPrice || ''}
          onChange={(e) => handleInputChange('minPrice', Number(e.target.value) || 0)}
        />
      </div>

      {/* Precio máximo */}
      <div className="filter-group">
        <label htmlFor="maxPrice">Precio máximo:</label>
        <input
          id="maxPrice"
          type="number"
          placeholder="1000000"
          value={filters.maxPrice || ''}
          onChange={(e) => handleInputChange('maxPrice', Number(e.target.value) || 0)}
        />
      </div>

      {/* Botón para limpiar filtros */}
      <button 
        className="btn btn-secondary"
        onClick={onClearFilters}
      >
        Limpiar filtros
      </button>
    </div>
  );
};

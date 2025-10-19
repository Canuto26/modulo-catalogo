import React from 'react';
import { ProductFilters, Category } from '../types';

interface ProductFiltersProps {
  filters: ProductFilters;
  categories: Category[];
  onFiltersChange: (filters: Partial<ProductFilters>) => void;
  onClearFilters: () => void;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  filters,
  categories,
  onFiltersChange,
  onClearFilters,
}) => {
  const handleInputChange = (field: keyof ProductFilters, value: string | number) => {
    onFiltersChange({ [field]: value });
  };

  return (
    <div className="product-filters">
      <h3>Filtros</h3>
      
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

      <button 
        className="btn btn-secondary"
        onClick={onClearFilters}
      >
        Limpiar filtros
      </button>
    </div>
  );
};

import React from "react";
import type { ProductFiltersProps, ProductFilters } from '../../../types/ProductTypes';

export const ProductFiltersComp: React.FC<ProductFiltersProps> = ({
  filters,
  categories,
  onFiltersChange,
  onClearFilters,
}) => {
  // CORRECCIÓN: Usar keyof ProductFilters (no ProductFiltersProps)
  const handleInputChange = (field: keyof ProductFilters, value: string | number | undefined) => {
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
          onChange={(e) => handleInputChange('search', e.target.value || undefined)}
        />
      </div>

      {/* Filtro de categoría */}
      <div className="filter-group">
        <label htmlFor="category">Categoría:</label>
        <select
          id="category"
          value={filters.category || ''}
          onChange={(e) => handleInputChange('category', e.target.value || undefined)}
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
          onChange={(e) => handleInputChange('minPrice', e.target.value ? Number(e.target.value) : undefined)}
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
          onChange={(e) => handleInputChange('maxPrice', e.target.value ? Number(e.target.value) : undefined)}
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
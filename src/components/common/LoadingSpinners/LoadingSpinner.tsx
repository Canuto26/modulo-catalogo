import React from 'react';
import type { LoadingSpinnerProps } from '../../../types/ProductTypes';

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'medium', 
  message = 'Cargando...' 
}) => {
  const sizeClass = `spinner-${size}`;
  
  return (
    <div className="loading-spinner">
      <div className={`spinner ${sizeClass}`}></div>
      {message && <p className="loading-message">{message}</p>}
    </div>
  );
};

// frontend/src/components/ErrorBanner.jsx

import React from 'react';

// Este componente recibe el mensaje de error como una prop
const ErrorBanner = ({ error }) => {
  if (!error) return null;

  return (
    <div style={{
      border: '1px solid red',
      backgroundColor: '#ffe3e3',
      color: 'red',
      padding: '15px',
      margin: '20px 0',
      borderRadius: '4px',
      textAlign: 'center'
    }}>
      🛑 Error al cargar la aplicación: {error}
    </div>
  );
};

export default ErrorBanner;
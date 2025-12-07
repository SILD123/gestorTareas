// frontend/src/components/Loader.jsx

import React from 'react';

const Loader = () => {
  return (
    <div style={{ 
        textAlign: 'center', 
        padding: '50px', 
        fontSize: '20px', 
        color: '#007bff' // Color azul simple
    }}>
      {/* Aquí puedes añadir un spinner CSS o una imagen */}
      ⏳ Cargando datos del servidor...
    </div>
  );
};

export default Loader;
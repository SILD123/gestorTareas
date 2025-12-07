// frontend/src/components/TaskForm.jsx

import React, { useState, useEffect } from 'react';

// Recibe la tarea a editar, la función para guardar (onSave) y la función para cancelar (onCancel)
const TaskForm = ({ taskToEdit, onSave, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // 1. Efecto: precargar datos si taskToEdit cambia (Modo Edición)
  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
    } else {
      // Limpiar el formulario si se sale del modo edición
      setTitle('');
      setDescription('');
    }
  }, [taskToEdit]); // Se ejecuta cada vez que taskToEdit cambia

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!title.trim()) {
      setError('El título de la tarea es obligatorio.');
      return;
    }

    try {
      setIsSubmitting(true);
      
      // 2. Llamar a la función onSave (la cual decide si es POST o PUT)
      await onSave({ title, description }); 
      
      // La limpieza se hace en onSave si es edición (setTaskToEdit(null))
      // Si es creación, se limpia aquí:
      if (!taskToEdit) {
        setTitle('');
        setDescription('');
      }

    } catch (err) {
      setError(err.message || 'Error desconocido al guardar la tarea.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isEditing = !!taskToEdit;
  // Muestra el título dependiendo del modo (Creación o Edición)
  const formTitle = isEditing ? `Editar Tarea: ${taskToEdit.title}` : 'Crear Nueva Tarea';

  return (
    <div style={{ marginBottom: '30px', padding: '15px', border: '1px solid #ccc', borderRadius: '5px' }}>
      <h3>{formTitle}</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <form onSubmit={handleSubmit}>
        
        {/* INPUT TÍTULO - CORRECCIÓN: Agrega value y onChange */}
        <input
          type="text"
          placeholder="Título (Obligatorio)"
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
          disabled={isSubmitting}
        />
        
        {/* TEXTAREA DESCRIPCIÓN - CORRECCIÓN: Agrega value y onChange */}
        <textarea
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="3"
          style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
          disabled={isSubmitting}
        ></textarea>
        
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Guardando...' : (isEditing ? 'Guardar Cambios' : 'Crear Tarea')}
        </button>

        {/* Botón de Cancelar solo visible en modo edición */}
        {isEditing && (
          <button type="button" onClick={onCancel} style={{ marginLeft: '10px' }} disabled={isSubmitting}>
            Cancelar Edición
          </button>
        )}
      </form>
    </div>
  );
};

export default TaskForm;
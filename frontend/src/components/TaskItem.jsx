// frontend/src/components/TaskItem.jsx

import React from 'react';

/**
 * Muestra una tarea individual y sus acciones.
 * @param {object} task - El objeto de la tarea con sus datos (title, description, completed, _id).
 * @param {function} onToggle - Función para cambiar el estado 'completed' (usa PUT).
 * @param {function} onDelete - Función para eliminar la tarea (usa DELETE).
 * @param {function} onEdit - Función para pasar la tarea al formulario para ser editada.
 */
const TaskItem = ({ task, onToggle, onDelete, onEdit }) => {
  const itemStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    margin: '5px 0',
    borderBottom: '1px solid #eee',
    // Estilo visual simple para indicar que está completada
    backgroundColor: task.completed ? '#e6ffe6' : 'white', 
    borderRadius: '4px',
  };

  const titleStyle = {
    // Tacha el título si la tarea está completada
    textDecoration: task.completed ? 'line-through' : 'none',
    flexGrow: 1, 
    marginRight: '15px',
  };

  return (
    <div style={itemStyle}>
      {/* 1. Contenido de la Tarea (Título y Descripción) */}
      <div style={titleStyle}>
        <strong>{task.title}</strong>
        {/* Muestra la descripción si existe */}
        {task.description && <p style={{ margin: 0, fontSize: '0.9em', color: '#666' }}>{task.description}</p>}
      </div>

      {/* 2. Controles de Acción */}
      <div style={{ display: 'flex', gap: '5px' }}>
        
        {/* Botón de Completar/Deshacer (Actualizar el campo 'completed') */}
        <button 
          onClick={() => onToggle(task._id, { completed: !task.completed })}
          style={{ backgroundColor: task.completed ? '#ffc107' : '#28a745', color: 'white', border: 'none' }}
        >
          {task.completed ? 'Deshacer' : 'Completar'}
        </button>

        {/* Botón de Editar (Inicia el modo edición en TaskForm) */}
        <button 
          onClick={() => onEdit(task)} 
          style={{ backgroundColor: '#007bff', color: 'white', border: 'none' }}
        >
          Editar
        </button>

        {/* Botón de Eliminar (Llama a DELETE) */}
        <button 
          onClick={() => onDelete(task._id)} 
          style={{ backgroundColor: '#dc3545', color: 'white', border: 'none' }}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
// frontend/src/components/TaskList.jsx

import React from 'react';
import TaskItem from './TaskItem'; // Importa el componente hijo TaskItem

/**
 * Componente contenedor que itera sobre la lista de tareas.
 */
const TaskList = ({ tasks, onToggle, onDelete, onEdit }) => {
  // Estado de lista vacía
  if (tasks.length === 0) {
    return (
      <p style={{ padding: '15px', border: '1px solid #ccc', borderRadius: '5px', marginTop: '20px', textAlign: 'center' }}>
        No hay tareas disponibles. ¡Crea una!
      </p>
    ); 
  }

  // Renderiza la lista con las tareas
  return (
    <div style={{ border: '1px solid #ccc', borderRadius: '5px', marginTop: '20px' }}>
      {tasks.map(task => (
        <TaskItem
          key={task._id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default TaskList;
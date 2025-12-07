import React, { useState } from 'react';
import useTasks from '../hooks/useTasks'; 
import Loader from '../components/Loader'; 
import ErrorBanner from '../components/ErrorBanner';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList'; // Importar el componente de lista

const HomePage = () => {
  // Estado para saber qué tarea estamos editando (si null, estamos creando)
  const [taskToEdit, setTaskToEdit] = useState(null); 
  
  // Hook que maneja toda la lógica CRUD y el estado global de la lista
  const { tasks, isLoading, error, addTask, removeTask, editTask } = useTasks();

  // Función unificada que decide si llamar a addTask o editTask
  const handleSave = async (data) => {
    try {
      if (taskToEdit) {
        // Modo Edición: Llama a PUT con el ID y los nuevos datos
        await editTask(taskToEdit._id, data); 
        setTaskToEdit(null); // Limpia el estado de edición al terminar
      } else {
        // Modo Creación: Llama a POST
        await addTask(data); 
      }
    } catch (err) {
      // El hook ya maneja la actualización del estado de error si falla la API
      console.error("Error al guardar la tarea:", err);
    }
  };

  // --- RENDERING CONDICIONAL ---

  if (isLoading) {
    return <Loader />; 
  }

  if (error) {
    return <ErrorBanner error={error} />; 
  }

  // --- RENDERIZADO PRINCIPAL ---
  
  return (
    <div style={{ padding: '20px' }}>
      <h1>✅ Gestor de Tareas</h1>
      
      {/* 1. TaskForm: Usado para Crear y Editar */}
      <TaskForm 
        taskToEdit={taskToEdit}         // Pasa la tarea seleccionada (o null)
        onSave={handleSave}             // Función para guardar (maneja POST y PUT)
        onCancel={() => setTaskToEdit(null)} // Función para salir del modo edición
      /> 

      <h2>Lista de Tareas ({tasks.length})</h2>

      {/* 2. TaskList: Pasa las funciones de acción a los TaskItem */}
      <TaskList
        tasks={tasks}
        onToggle={editTask}      // Usa editTask para cambiar el estado 'completed'
        onDelete={removeTask}    // Usa removeTask para eliminar
        onEdit={setTaskToEdit}   // Pasa la tarea al estado local para iniciar la edición
      />
    </div>
  );
};

export default HomePage;
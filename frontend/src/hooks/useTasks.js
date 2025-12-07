// frontend/src/hooks/useTasks.js

import { useState, useEffect } from 'react';
// Importa las funciones que creaste en api.js
import { fetchTasks, createTask, updateTask, deleteTask } from '../services/api'; 

const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // ------------------------------------
  // FUNCIÓN PARA CARGAR TAREAS INICIALES
  // ------------------------------------
  const loadTasks = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchTasks();
      setTasks(data);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Carga las tareas al montar el componente que use este hook
  useEffect(() => {
    loadTasks();
  }, []); // El array vacío asegura que se ejecute solo una vez

  // ------------------------------------
  // FUNCIONES CRUD PARA LA UI
  // ------------------------------------

  const addTask = async (taskData) => {
    try {
      const newTask = await createTask(taskData);
      setTasks(prevTasks => [...prevTasks, newTask]); // Añade la nueva tarea al estado local
    } catch (err) {
      setError(err.message);
      throw err; // Permite al componente (TaskForm) manejar el error también
    }
  };

  const editTask = async (taskId, updatedData) => {
    try {
      const updatedTask = await updateTask(taskId, updatedData);
      // Reemplaza la tarea antigua con la nueva en el estado
      setTasks(prevTasks => prevTasks.map(t => (t._id === taskId ? updatedTask : t)));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const removeTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      // Filtra y elimina la tarea del estado
      setTasks(prevTasks => prevTasks.filter(t => t._id !== taskId));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return {
    tasks,
    isLoading,
    error,
    addTask,
    editTask,
    removeTask,
    loadTasks // Por si necesitas recargar manualmente
  };
};

export default useTasks;
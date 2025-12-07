// frontend/src/services/api.js

// La URL base debe coincidir con el puerto y path donde montaste tu API de Express
const API_BASE_URL = 'http://localhost:5000/api/tasks';

// ------------------------------------
// 1. OBTENER TODAS LAS TAREAS (GET)
// ------------------------------------
export const fetchTasks = async () => {
  const response = await fetch(API_BASE_URL);

  if (!response.ok) {
    // Manejo de errores
    throw new Error('No se pudieron cargar las tareas.');
  }

  return response.json();
};

// ------------------------------------
// 2. CREAR UNA NUEVA TAREA (POST)
// ------------------------------------
export const createTask = async (taskData) => {
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(taskData),
  });

  if (!response.ok) {
    const errorBody = await response.json();
    throw new Error(errorBody.message || 'Error al crear la tarea.');
  }

  return response.json();
};

// ------------------------------------
// 3. ACTUALIZAR UNA TAREA (PUT)
// ------------------------------------
export const updateTask = async (taskId, updatedData) => {
  const response = await fetch(`${API_BASE_URL}/${taskId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedData),
  });

  if (!response.ok) {
    throw new Error('Error al actualizar la tarea.');
  }

  return response.json();
};

// ------------------------------------
// 4. ELIMINAR UNA TAREA (DELETE)
// ------------------------------------
export const deleteTask = async (taskId) => {
  const response = await fetch(`${API_BASE_URL}/${taskId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Error al eliminar la tarea.');
  }
  
  // Si todo está bien, devuelve un mensaje o simplemente true/void
  return true; 
};
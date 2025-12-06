// backend/routes/tasks.js

const express = require('express');
const Task = require('../models/Task'); // <-- Debe usar 'Task' con mayúscula

const router = express.Router();

// RUTA 1: Obtener todas las tareas (GET /api/tasks)
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find({}); 
    res.status(200).json(tasks); 
  } catch (error) {
    // 🛑 AGREGAMOS ESTA LÍNEA TEMPORALMENTE 🛑
    console.error('DETALLE DEL ERROR DE MONGO:', error); 
    
    // Y aquí devolvemos el detalle del error al cliente (frontend)
    res.status(500).json({ 
        message: 'Error al obtener las tareas', 
        error: error.message,
        detail: error.stack // Enviamos el detalle para verlo en el navegador
    });
  }
});

// ------------------------------------
// RUTA 2: Crear una nueva tarea (POST /api/tasks)
// ------------------------------------
router.post('/', async (req, res) => {
  try {
    const { title, description } = req.body;
    
    if (!title) {
      return res.status(400).json({ message: 'El título de la tarea es obligatorio.' });
    }

    const newTask = new Task({ title, description });
    const savedTask = await newTask.save();
    
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la tarea', error: error.message });
  }
});
// ------------------------------------
// RUTA 3: Actualizar una tarea por ID (PUT /api/tasks/:id)
// ------------------------------------
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params; // Captura el ID de la URL
    // { new: true } asegura que Mongoose devuelva el documento actualizado
    const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

    if (!updatedTask) {
      return res.status(404).json({ message: 'Tarea no encontrada.' });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la tarea', error: error.message });
  }
});

// ------------------------------------
// RUTA 4: Eliminar una tarea por ID (DELETE /api/tasks/:id)
// ------------------------------------
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ message: 'Tarea no encontrada.' });
    }

    // Responder con 204 No Content para eliminación exitosa (o 200 con el objeto eliminado)
    res.status(200).json({ message: 'Tarea eliminada con éxito', deletedTask });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la tarea', error: error.message });
  }
});

module.exports = router;
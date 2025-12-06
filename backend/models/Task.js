// backend/models/Task.js

const mongoose = require('mongoose');

// ¡Asegúrate de que 'new' esté aquí!
const TaskSchema = new mongoose.Schema({ 
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    default: 'No description provided'
  },
  completed: {
    type: Boolean,
    default: false
  },
}, {
  // Asegúrate de que timestamps esté en plural
  timestamps: true 
});

// El nombre del modelo es 'Task' y usa el esquema definido arriba
const Task = mongoose.model('Task', TaskSchema);
module.exports = Task;
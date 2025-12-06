// backend/index.js

// 1. Cargar variables de entorno (necesita el .env)
require('dotenv').config(); 

// 2. Importar módulos
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Importar el router de tareas (que crearemos en el paso 2)
const tasksRouter = require('./routes/tasks'); 

// 3. Inicialización
const app = express();
const port = process.env.PORT || 5000;
const mongoURI = process.env.MONGO_URI;

// 4. Conexión a MongoDB Atlas
mongoose.connect(mongoURI)
  .then(() => console.log('✅ Conexión exitosa a MongoDB Atlas'))
  .catch(err => console.error('❌ Error de conexión a MongoDB:', err.message));

// 5. Middlewares de Express
app.use(cors()); // Permite peticiones del frontend
app.use(express.json()); // Permite a Express leer el cuerpo de las peticiones JSON

// 6. Montar las Rutas
app.use('/api/tasks', tasksRouter); // Todas las rutas definidas en tasksRouter responderán en /api/tasks

// Ruta de prueba simple
app.get('/', (req, res) => {
  res.send('API del Gestor de Tareas funcionando.');
});

// 7. Iniciar el servidor
app.listen(port, () => {
  console.log(`🚀 Servidor Express escuchando en http://localhost:${port}`);
});
const express = require('express');
const dotenv = require('dotenv');
const vehicleRoutes = require('./routes/vehicleRoutes');  // Rutas para manejar vehículos

dotenv.config();  // Cargar variables de entorno

const app = express();
const PORT = process.env.PORT || 3002;  // Puerto específico para este microservicio

app.use(express.json());  // Middleware para parsear JSON

// Rutas
app.use('/api/vehicle', vehicleRoutes);  // Usar las rutas definidas para manejar la eliminación

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Delete Vehicle microservice running on port ${PORT}`);
});
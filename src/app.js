const express = require('express');
const cors = require('cors'); // Importar el paquete cors
const app = express();
const vehicleRoutes = require('./routes/vehicleRoutes');
const dotenv = require('dotenv');

dotenv.config();

// Habilitar CORS para todas las rutas y orígenes
app.use(cors());

const PORT = process.env.PORT || 3002;  

app.use(express.json());  

app.use('/api/vehicle', vehicleRoutes); 

app.listen(PORT, () => {
    console.log(`Delete Vehicle microservice running on port ${PORT}`);
});
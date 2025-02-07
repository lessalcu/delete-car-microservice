const express = require('express');
const dotenv = require('dotenv');
const vehicleRoutes = require('./routes/vehicleRoutes');  

dotenv.config();  

const app = express();
const PORT = process.env.PORT || 3002;  

app.use(express.json());  

app.use('/api/vehicle', vehicleRoutes); 

app.listen(PORT, () => {
    console.log(`Delete Vehicle microservice running on port ${PORT}`);
});
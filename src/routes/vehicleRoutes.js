const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');

// Ruta para eliminar un vehículo por ID
router.delete('/:id', vehicleController.deleteVehicle);  // Llamar al controlador para eliminar vehículo

module.exports = router;

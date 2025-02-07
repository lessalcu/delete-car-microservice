const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');

router.delete('/:id', vehicleController.deleteVehicle); 

module.exports = router;

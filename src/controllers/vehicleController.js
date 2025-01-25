const db = require('../config/db');

// Controlador para eliminar un vehículo por ID
exports.deleteVehicle = async (req, res) => {
    const vehicleId = req.params.id;

    try {
        // Eliminar el vehículo de la base de datos
        const [result] = await db.execute('DELETE FROM Cars WHERE id = ?', [vehicleId]);

        // Verificar si se eliminó el vehículo
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }

        res.status(200).json({ message: 'Vehicle deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting vehicle', error: error.message });
    }
};

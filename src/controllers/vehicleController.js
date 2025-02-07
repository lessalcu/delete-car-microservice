const db = require('../config/db');
const request = require('request');
require('dotenv').config();

exports.deleteVehicle = async (req, res) => {
    const vehicleId = req.params.id;

    try {
        const userServiceUrl = `${process.env.QUERY_CAR_URL}/${vehicleId}`;
        
        request(userServiceUrl, { json: true }, async (err, response, body) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Error fetching user data', error: err.message });
            }

            const userId = body.userId;

            const [result] = await db.execute('DELETE FROM Cars WHERE id = ? AND userId = ?', [vehicleId, userId]);

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Vehicle not found' });
            }

            res.status(200).json({ message: 'Vehicle deleted successfully' });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting vehicle', error: error.message });
    }
};
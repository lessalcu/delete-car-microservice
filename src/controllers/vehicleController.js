const db = require('../config/db');
const request = require('request');
require('dotenv').config();

exports.deleteVehicle = async (req, res) => {
    const vehicleId = req.params.id;

    console.log("🔍 Vehicle ID received:", vehicleId);

    if (!vehicleId) {
        return res.status(400).json({ message: "Vehicle ID is required" });
    }

    try {
        const vehicleServiceUrl = `${process.env.QUERY_CAR_URL}/${vehicleId}`;
        console.log("🔗 Querying vehicle:", vehicleServiceUrl);

        request(vehicleServiceUrl, { json: true }, async (err, response, body) => {
            if (err) {
                console.error("❌ Error querying vehicle:", err);
                return res.status(500).json({ message: 'Error fetching vehicle data', error: err.message });
            }

            console.log("📩 Vehicle Service Response:", body);

            if (!body || !body.id) {
                return res.status(404).json({ message: "Vehicle not found" });
            }

            console.log("🚗 Deleting vehicle with ID:", vehicleId);

            try {
                const [result] = await db.execute(
                    'DELETE FROM Cars WHERE id = ?',
                    [vehicleId]
                );

                if (result.affectedRows === 0) {
                    return res.status(404).json({ message: 'Vehicle not found in database' });
                }

                res.status(200).json({ message: 'Vehicle deleted successfully' });
            } catch (dbError) {
                console.error("❌ Database error:", dbError);
                res.status(500).json({ message: 'Error deleting vehicle', error: dbError.message });
            }
        });
    } catch (error) {
        console.error("❌ Unexpected error:", error);
        res.status(500).json({ message: 'Error deleting vehicle', error: error.message });
    }
};
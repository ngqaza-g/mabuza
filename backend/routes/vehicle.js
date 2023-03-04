const express = require('express');
const register = require('../modules/vehicle_modules/register');
const validate_token = require('../modules/auth_modules/validate_token');
const get_vehicles = require('../modules/vehicle_modules/get_vehicles');
const router = express.Router();

router.post('/register', validate_token, register);
router.get('/get_vehicles', [validate_token, get_vehicles]);
router.get('/get_vehicle/:licence_plate_number', [validate_token, get_vehicles]);

module.exports = router;
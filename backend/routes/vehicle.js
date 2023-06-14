const express = require('express');
const register = require('../modules/vehicle_modules/register');
const validate_token = require('../modules/auth_modules/validate_token');
const get_vehicles = require('../modules/vehicle_modules/get_vehicles');
const add_driver = require('../modules/vehicle_modules/add_driver');
const remove_driver = require('../modules/vehicle_modules/remove_driver');
const remove_vehicle = require('../modules/vehicle_modules/remove_vehicle');
const get_all_vehicles = require('../modules/vehicle_modules/get_all_vehicles');
const get_images = require('../modules/vehicle_modules/get_images');
const router = express.Router();

router.post('/register', validate_token, register);
router.get('/get_vehicles', [validate_token, get_vehicles]);
router.get('/get_all_vehicles', [validate_token, get_all_vehicles]);
router.get('/get_authorised_vehicles', [validate_token, get_all_vehicles]);
router.get('/get_vehicle/:licence_plate_number', [validate_token, get_vehicles]);
router.get('/images/:licence_plate_number', [validate_token, get_images]);
router.post('/add_driver/:licence_plate_number', [validate_token, add_driver]);
router.patch('/delete_driver/:licence_plate_number', [validate_token, remove_driver]);
router.patch('/delete_vehicle', [validate_token, remove_vehicle]);

module.exports = router;
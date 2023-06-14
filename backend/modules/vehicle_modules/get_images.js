const path = require('path');
const fs = require('fs');
const Vehicle = require('../../models/Vehicle');

async function get_images(req, res){
    const { licence_plate_number } = req.params;
    const vehicle = await Vehicle.findVehicleByPlateNumber(licence_plate_number);

    const base_dir = path.join(__dirname, `../../public/images/${licence_plate_number}`);
    let images = fs.readdirSync(base_dir);

    images = images.map(image => `/images/${licence_plate_number}/${image}`);

    console.log(images);
    res.json({ vehicle, images});
}


module.exports = get_images;
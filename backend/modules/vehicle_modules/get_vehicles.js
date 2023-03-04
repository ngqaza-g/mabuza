const Vehicle = require('../../models/Vehicle');
const User = require('../../models/User');


const get_vehicles = async (req, res)=>{
    const licence_plate_number = req.params.licence_plate_number;
    const user_id = req.user._id;
    let vehicles;

    if(licence_plate_number){
        vehicles = await Vehicle.findVehicleByPlateNumber(licence_plate_number);
        const drivers = Promise.all(vehicles.drivers.map(async (driver)=> {
            driver = await User.findById(driver).select({
                name: 1
            });
            return driver;
        }));

        vehicles.drivers = drivers;
    }else{
        vehicles = await Vehicle.findOwnerVehicles(user_id);
    }

    res.json(vehicles);
}



module.exports = get_vehicles;
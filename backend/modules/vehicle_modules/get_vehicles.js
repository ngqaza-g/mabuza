const Vehicle = require('../../models/Vehicle');
const User = require('../../models/User');


const get_vehicles = async (req, res)=>{
    const licence_plate_number = req.params.licence_plate_number;
    const user_id = req.user._id;
    let vehicles;

    if(licence_plate_number){
        vehicles = await Vehicle.findVehicleByPlateNumber(licence_plate_number);
        const drivers = await Promise.all(vehicles.drivers.map(async (driver)=> {
            driver = await User.findById(driver.driver_id).select({
                name: 1,
                username: 1
            });
            return driver;
        }));

        const { _doc } = {...vehicles};
        vehicles = {..._doc, drivers};
        console.log(vehicles);
    }else{
        console.log(req.originalUrl);

        if(req.originalUrl === '/api/vehicle/get_vehicles'){
            vehicles = await Vehicle.findOwnerVehicles(user_id);
        }else{
            vehicles = await Vehicle.findAuthorisedVehicles(user_id);
        }
    }
    console.log("Breaker");
    console.log(vehicles);


    res.json(vehicles);
}



module.exports = get_vehicles;
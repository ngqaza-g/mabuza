const User = require("../../models/User");
const Vehicle = require("../../models/Vehicle");

const get_all_vehicles = async (req, res)=>{
    const user_id = req.user._id;

    const owned_vehicles = await Vehicle.findOwnerVehicles(user_id);
    const authorised_vehicles = await Vehicle.findAuthorisedVehicles(user_id);


    let vehicles = [...owned_vehicles, ...authorised_vehicles];



    vehicles = vehicles.map(vehicle =>{
        vehicle = vehicle.toObject();
        const { drivers } = vehicle;

        delete vehicle.drivers;

        drivers.map( driver => {
            if(driver.driver_id.equals(user_id)){
                vehicle["driver_id"] = driver.driver_id;
                vehicle["fingerprint_id"] = driver.fingerprint_id;
            }
        });

        return vehicle;
    });


    vehicles = vehicles.filter((obj, index, self)=>{
        return (index === self.findIndex( t => t.licence_plate_number === obj.licence_plate_number))
    });

    console.log(vehicles);

    res.json(vehicles);
}



module.exports = get_all_vehicles;
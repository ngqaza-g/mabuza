const Vehicle = require('../../models/Vehicle');
const User = require('../../models/User');

const add_driver = async (req, res)=>{
    const { driver_username  } = req.body;
    const { licence_plate_number } = req.params
    // console.log(licence_plate_number);
    const driver = await User.findByEmailOrUsername(driver_username);
    if(driver){
        const vehicle = await Vehicle.findVehicleByPlateNumber(licence_plate_number);
        // console.log(vehicle)
        if(vehicle){
            try{
                const newVehicle = await vehicle.addDriver(driver._id);
                res.json({msg: "Driver now aurthorised to drive your vehicle"});
            }catch(error){
                console.log(error.message);
                res.status(404).json({error: error.message});    
            }

        }else{
            res.status(404).json({error: "Vehicle not found"});    
        }
    }else{
        res.status(404).json({error: "Driver Not found"});
    }
}

module.exports = add_driver;
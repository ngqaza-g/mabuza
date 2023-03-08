const Vehicle = require('../../models/Vehicle');
const User = require('../../models/User');

const remove_driver = async (req, res)=>{
    const { driver_username  } = req.body;
    const { licence_plate_number } = req.params
    const owner_id = req.user._id;
    
    const vehicle = await Vehicle.findVehicleByPlateNumber(licence_plate_number);
    if(vehicle.owner_id.equals(owner_id)){
        if(vehicle){
            const driver = await User.findByEmailOrUsername(driver_username);
            if(driver){
                try{
                    const newVehicle = await vehicle.removeDriver(driver._id);
                    console.log(newVehicle);
                    res.json({msg: "Driver Removed"});
                }catch(error){
                    res.status(401).json({msg: error.message})
                }
            }
        }else{
            res.status(404).json({msg: "Vehicle Not Found"});    
        }
    }else{
        res.status(401).json({msg: "Removing Driver Forbiden"});
    }
}


module.exports = remove_driver;
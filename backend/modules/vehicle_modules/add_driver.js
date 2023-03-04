import Vehicle from "../../models/Vehicle";
import User from '../../models/User';

const add_driver = async (req, res)=>{
    const { driver_username, vehicle_licence_plate_number } = req.body;
    const driver = User.findByEmailOrUsername(driver_username);
    if(driver){
        const vehicle = Vehicle.findVehicleByPlateNumber(vehicle_licence_plate_number);
        if(vehicle){
            vehicle.addDriver(driver._id);
            res.json({msg: "Driver now aurthorised to drive your vehicle"});
        }else{
            res.status(404).json({error: "Vehicle not found"});    
        }
    }else{
        res.status(404).json({error: "Driver Not found"});
    }
}

module.exports = add-driver;
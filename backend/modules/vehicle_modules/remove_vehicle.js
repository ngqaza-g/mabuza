const User = require("../../models/User");
const Vehicle = require("../../models/Vehicle");

const remove_vehicle = async (req, res)=>{
    const owner_id = req.user._id;
    const { licence_plate_number } = req.body;
    const vehicle = await Vehicle.findVehicleByPlateNumber(licence_plate_number);
    if(vehicle.owner_id.equals(owner_id)){
        await vehicle.remove();
    }else{
        res.status(401).json({msg: "Delete Forbiden"});
    }
    res.json({msg: "Vehicle Removed"});

}


module.exports = remove_vehicle;
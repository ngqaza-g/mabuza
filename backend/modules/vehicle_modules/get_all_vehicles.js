const User = require("../../models/User");
const Vehicle = require("../../models/Vehicle");

const get_all_vehicles = async (req, res)=>{
    const user_id = req.user._id;

    const owned_vehicles = await Vehicle.findOwnerVehicles(user_id);
    const authorised_vehicles = await Vehicle.findAuthorisedVehicles(user_id);


    const vehicles = [...owned_vehicles, ...authorised_vehicles];

    console.log(vehicles);

    res.json(vehicles);
}



module.exports = get_all_vehicles;
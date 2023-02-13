const Vehicle = require('../../models/Vehicle');


const get_vehicles = async (req, res)=>{
    const user_id = req.user._id;

    const vehicles = await Vehicle.findOwnerVehicles(user_id);

    res.json(vehicles);
}



module.exports = get_vehicles;
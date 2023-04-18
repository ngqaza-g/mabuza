const Vehicle = require('../../models/Vehicle');

const register = async (req, res)=>{
    if(req.user){
        const owner_id = req.user._id;
        const vehicle = req.body;

        try{
            const newVehicle = await Vehicle.create({...vehicle, owner_id});
            await newVehicle.addDriver(owner_id);
            res.send("Vehicle Successfully registerd");
        }catch(error){
            console.log(error);
            res.status(400).json({msg: "An error occured", error})
        }
    }
}

module.exports = register;
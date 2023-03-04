const mongoose = require('mongoose');


const vehicleSchema = mongoose.Schema({
    owner_id: {
        type: mongoose.Types.ObjectId,
        required: [true, 'User Id not found']
    },

    model: {
        type: String,
        required: [true, 'Please Enter Vehicle Model']
    },
    make: {
        type: String,
        required: [true, 'Please Enter Vehicle Make']
    },

    licence_plate_number: {
        type: String,
        required: [true, 'Please Enter Vehicle Licence Plate Number']
    },
    drivers:{
        type: Array,
        default: []
    }
});

vehicleSchema.statics.findOwnerVehicles = async function(owner_id){
    return await this.find({owner_id});
}

vehicleSchema.statics.findVehicleByPlateNumber = async function(licence_plate_number){
    return await this.findOne({licence_plate_number});
}

vehicleSchema.methods.addDriver = function(driver){
    this.drivers.push(driver);
    return this.save();
}

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

module.exports = Vehicle;
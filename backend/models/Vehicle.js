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
});

vehicleSchema.statics.findOwnerVehicles = function(owner_id){
    return this.find({owner_id});
}




const Vehicle = mongoose.model('Vehicle', vehicleSchema);

module.exports = Vehicle;
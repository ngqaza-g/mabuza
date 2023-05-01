const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
    driver_id : {
        type: mongoose.Types.ObjectId,
        uniquie: true
    },
    fingerprint_id: {
        type: Number,
        default: -1
        // uniquie: true,
    }
});

const vehicleSchema = new mongoose.Schema({
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
    drivers: [ driverSchema ]
});

vehicleSchema.statics.findOwnerVehicles = async function(owner_id){
    return await this.find({owner_id});
}

vehicleSchema.statics.findAuthorisedVehicles = async function(driver_id){
    const vehicles = await this.find();
    const authorised_vehicles = vehicles.filter(vehicle =>{
        if(vehicle.drivers.find(driver => driver.driver_id.equals(driver_id))) return vehicle;
    });

    return authorised_vehicles;
}

vehicleSchema.statics.findVehicleByPlateNumber = async function(licence_plate_number){
    return await this.findOne({licence_plate_number});
}


vehicleSchema.methods.updateFingerprintId = async function(driver_id, fingerprint_id){
    const driver = this.drivers.find(driver =>{
        return driver.driver_id.equals(driver_id)
    });
    console.log(driver)
    if(!driver) return 
    driver.fingerprint_id = fingerprint_id;
    return await this.save();
}

vehicleSchema.methods.addDriver =  async function(driver_id){
    const driver = await this.drivers.find(driver =>{
        return driver.driver_id.equals(driver_id);
    });
    console.log(driver)
    if(!driver){
        await this.drivers.push({driver_id});
        return await this.save()
    }else{
        throw new Error("Driver Aleady Authorised to drive this Vehicle");
    }
}

vehicleSchema.methods.removeDriver = async function(driver_id){
    this.drivers = this.drivers.filter(driver =>{
        return !driver.driver_id.equals(driver_id);
    });
    console.log(this.drivers)
    return await this.save();
}

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

module.exports = Vehicle;
const mongoose = require('mongoose');
const faceapi = require('face-api.js');

const faceDescriptorSchema = new mongoose.Schema({
    label : {
        type: String,
        required: [true, "label required"]
    },
    descriptors: {
        type: Array,
        required: [true, "Descriptors Required"]
    }
});

faceDescriptorSchema.statics.findByUserId = function(user_id){
    return this.findOne({label: user_id});
}


module.exports = mongoose.model('face descriptor', faceDescriptorSchema);
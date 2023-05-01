const faceapi = require('face-api.js');
const canvas = require('canvas');

const FaceDescriptor = require('../models/FaceDescriptor');
const recognise_face = async (image)=>{
    const imageCanvas = await canvas.loadImage(`data:image/jpg;base64,${image}`);
    const faceDescriptorsJson = await FaceDescriptor.find();
    const labeledFaceDescriptors = getLabeledDescriptors(faceDescriptorsJson);
    const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors);
    const detections = await faceapi.detectSingleFace(imageCanvas).withFaceLandmarks().withFaceDescriptor();
    if(!detections) return null;
    const result =  faceMatcher.findBestMatch(detections.descriptor);
    return result
}

function getLabeledDescriptors(json){
    const labeledFaceDescriptors = json.map( obj =>{
        let { label, descriptors } = obj;

        descriptors = descriptors.map(descriptor => new Float32Array(descriptor));
        return new faceapi.LabeledFaceDescriptors(label, descriptors);
    });

    return labeledFaceDescriptors
}


module.exports = recognise_face;
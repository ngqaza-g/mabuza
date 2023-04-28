const fs = require('fs');
const path = require('path');
const canvas = require('canvas');
const faceapi = require('face-api.js');
const FaceDescriptor = require('../../models/FaceDescriptor');

const upload_images = async (req, res)=>{
    const { _id } = req.user;

    const faceImagesDir = path.join(__dirname, `../../images/${_id}`);

    const images = fs.readdirSync(faceImagesDir);

    const faceDescriptors = [];
    for (const image of images) {
        const imagePath = path.join(faceImagesDir, image);
        const img = await canvas.loadImage(imagePath);
        const detections = await faceapi.detectSingleFace(img)
          .withFaceLandmarks()
          .withFaceDescriptor();
        faceDescriptors.push(detections.descriptor);
    }
    
    const labeledFaceDescriptors = new faceapi.LabeledFaceDescriptors(_id.toString(), faceDescriptors);
    console.log(labeledFaceDescriptors); 
    const json = JSON.parse(JSON.stringify(labeledFaceDescriptors));
    await FaceDescriptor.create(json);

    fs.rmdir(faceImagesDir, { recursive: true }, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log('Directory deleted successfully');
      }
    });


    res.json({msg: "Images Uploaded Sucessfully"});
}


module.exports= upload_images;
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

    try{
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
  
      fs.rm(faceImagesDir, { recursive: true }, (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log('Directory deleted successfully');
        }
      });
      res.json({msg: "Images Uploaded Sucessfully"});
    }catch(e){
      console.log("An error occured while training face recognition model")
      console.log("Use pictures which shows yourface clearly")
      res.status(400).json({msg : "An error occured while training face recognition model"})
    }
}


module.exports= upload_images;
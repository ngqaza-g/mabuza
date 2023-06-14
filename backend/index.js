const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
// const faceapi = require('face-api.js');
// const canvas = require('canvas');
require('dotenv').config();

// const { Canvas, Image, ImageData } = canvas;
// faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/vehicle', require('./routes/vehicle'));

mongoose.set('strictQuery', false);

// Promise.all([
//     faceapi.nets.ssdMobilenetv1.loadFromDisk('./face-api_models'),
//     faceapi.nets.faceLandmark68Net.loadFromDisk('./face-api_models'),
//     faceapi.nets.faceRecognitionNet.loadFromDisk('./face-api_models'),
// ])
// .then(()=>
mongoose.connect(`mongodb://${process.env.MONGO_DB_URL}/mabuza`, {useNewUrlParser: true,})
.then(()=>{
    // First Connect to the database the listen for requests.
    console.log("Connected to the database");
    require('./modules/mqttClient'); 
    app.listen(PORT, ()=> console.log(`SERVER STARTED ON PORT ${PORT}`));
})
.catch((e)=>{
    console.log(e);
    console.log("An error occured");
});
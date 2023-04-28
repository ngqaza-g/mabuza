const mqtt = require('mqtt');
const Vehicle = require('../models/Vehicle');
const recogniseFace = require('./recognise_face');

const mqttClient = mqtt.connect('mqtt://localhost');


mqttClient.on('connect', ()=>{
    console.log("Connected to an MQTT broker");
    mqttClient.subscribe("fingerprint_id");
    mqttClient.subscribe("recognise_face");
});


mqttClient.on('message', (topic, message)=>{
    if(topic === "fingerprint_id"){
        const { driver_id, fingerprint_id, license_plate_number } = JSON.parse(message.toString());
        console.log(`Driver Id: ${driver_id}`);
        console.log(`Fingerprint ID: ${fingerprint_id}`);
        console.log.apply(`License Plate Number: ${license_plate_number}`);
    }

    if(topic === "recognise_face"){
        const image = message.toString();
        const result = recogniseFace(image);
        console.log(result);
    }
})


module.exports = mqttClient;
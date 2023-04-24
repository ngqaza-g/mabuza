const mqtt = require('mqtt');
const Vehicle = require('../models/Vehicle');

const mqttClient = mqtt.connect('mqtt://localhost');
// console.log(mqttClient)


mqttClient.on('connect', ()=>{
    console.log("Connected to an MQTT broker");
    mqttClient.subscribe("fingerprint_id")
});


mqttClient.on('message', (topic, message)=>{
    if(topic === "fingerprint_id"){
        const { driver_id, fingerprint_id, license_plate_number } = JSON.parse(message.toString());
        console.log(driver_id);
    }
})


module.exports = mqttClient;
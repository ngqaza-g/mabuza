const mqtt = require('mqtt');
const Vehicle = require('../models/Vehicle');
// const recogniseFace = require('./recognise_face');
const fs = require('fs');

const mqttClient = mqtt.connect('mqtt://127.0.0.1');


mqttClient.on('connect', async()=>{
    console.log("Connected to an MQTT broker");
    mqttClient.subscribe("fingerprint_id");
    mqttClient.subscribe("recognise_face");
});


mqttClient.on('message', async (topic, message)=>{
    if(topic === "fingerprint_id"){
        const { driver_id, fingerprint_id, licence_plate_number } = JSON.parse(message.toString());

        const vehicle = await Vehicle.findVehicleByPlateNumber(licence_plate_number);
        // const vehicle = await Vehicle.updateFingerprintId(license_plate_number, driver_id, fingerprint_id);
        await vehicle.updateFingerprintId(driver_id, fingerprint_id)
        console.log(vehicle);
        console.log(`Driver Id: ${driver_id}`);
        console.log(`Fingerprint ID: ${fingerprint_id}`);
        console.log(`License Plate Number: ${licence_plate_number}`);
    }
    
    if(topic === "image"){
        const { image, licence_plate_number } = JSON.parse(message.toString());
        const imageData = Buffer.from(image, 'base64');
        let filepath = path.join(__dirname, `../images/${licence_plate_number}`);
        if(!fs.existsSync(dest)) fs.mkdirSync(filepath);
        const filename = `${Date.now()}.jpg`;
        filepath = path.join(filepath, filename);
        fs.writeFile(filepath, imageData, (err) => {
            if (err) {
              console.error(err);
            } else {
              console.log(`Saved image to ${filepath}`);
            }
          });
    }

    // if(topic === "recognise_face"){
    //     const { image, driver_id, license_plate_number } = JSON.parse(message.toString());
    //     // console.log(image);
    //     const result = await recogniseFace(image);
    //     console.log(result);

    //     label = result._label;

    //     mqttClient.publish(`face_recognised/${license_plate_number}`, JSON.stringify({isFaceVallid : label === driver_id}))
    // }
})


module.exports = mqttClient;
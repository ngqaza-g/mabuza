const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', require('./routes/auth'));
app.use('/api/vehicle', require('./routes/vehicle'));

console.log(process.env.MONGO_DB_URL);
mongoose.set('strictQuery', false);

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
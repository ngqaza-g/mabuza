const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', require('./routes/auth'));

console.log(process.env.MONGO_DB_URL);
mongoose.set('strictQuery', false);

mongoose.connect(`mongodb://${process.env.MONGO_DB_URL}/busi`, {useNewUrlParser: true,})
.then(()=>{
    // First Connect to the database the listen for requests.
    console.log("Connected to the database"); 
    app.listen(PORT, ()=> console.log(`SERVER STARTED ON PORT ${PORT}`));
})
.catch((e)=>{
    console.log(e);
    console.log("An error occured");
});
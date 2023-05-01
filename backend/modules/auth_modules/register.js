const User = require('../../models/User');
const error_msg = require('../error/error_message');

const register = async (req, res, next)=>{
    // if(req.user){
        const {name, username, email, password, phone_number} = req.body;
        console.log(phone_number);
        try{
            const newUser = await User.create({
                name,
                username, 
                email,
                password,
                phone_number
            });
            next();
        }catch(error){
            console.log("Failed to register");
            console.log(error);
            res.status(400).json({error: error_msg(error)});
        }
    // }
}


module.exports = register;
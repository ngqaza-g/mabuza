const FaceDescriptor = require('../../models/FaceDescriptor');
const User = require('../../models/User');

const login = async (req, res)=>{
    if(!req.user){
        const {username, email, password} = req.body;
    
        let user;
    
        // Checking if user whats to use username or email as login credentials
        if(username){
            user = await User.findByEmailOrUsername(username);
        }
        
        if(email && !user){
            user = await User.findByEmailOrUsername(username);
        }
        console.log(user);
    
        if(user){
            const isPasswordCorrect = await user.checkPassword(password) 
            if(isPasswordCorrect){
                const token = await user.getToken();
                const face_model = await FaceDescriptor.findByUserId(user._id);

                console.log(face_model);
                res.cookie('token', token, {maxAge: (7 * 24 * 60 * 60 * 1000), httpOnly: true } ).json({user: {id: user._id, name: user.name, username: user.username, email: user.email, role: user.role, face_model_available: (face_model ? true : false)}});
            }else{
                res.status(400).json({error: "Incorrect Password"});
            }
        }else{
            res.status(404).json({error: "User Not Found"});
        }      
    }
}


module.exports = login;

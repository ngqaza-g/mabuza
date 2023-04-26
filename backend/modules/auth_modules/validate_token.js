const User = require('../../models/User');

const validate_token = async (req, res, next)=>{
    const { token } = req.cookies;
    if(token){
        const user = await User.verifyToken(token);
        if(user){
            req.token = token;
            req.user = user;
        }
        console.log(req.user)
        console.log("Validating Token");
        next();
    }else{
        res.status(400).json({msg: "No Token"});
    }
}


module.exports = validate_token;
const User = require('../../models/User'); 

const change_password = async (req, res)=>{
    // if(req.user){
        const { oldPassword, newPassword } = req.body;
        const user = req.user;
        console.log(user);
        const isChanged = await user.changePassword(newPassword, oldPassword);
        console.log(isChanged);
        res.json({isChanged});
    // }
}

module.exports = change_password;
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const validate_token = require('../modules/auth_modules/validate_token');
const register = require('../modules/auth_modules/register');
const login = require('../modules/auth_modules/login');
const change_password = require('../modules/auth_modules/change_password');
const reset_password = require('../modules/auth_modules/reset_password');
const upload_images = require('../modules/auth_modules/upload_image');
const FaceDescriptor = require('../models/FaceDescriptor');

const router = express.Router();

const storage = multer.diskStorage({
    destination : (req, file, cb) =>{
        console.log("In Storage config");
        console.log(req.user);
        const {_id} = req.user;
        dest = path.join(__dirname,`../images/${_id}`);
        if(!fs.existsSync(dest)) fs.mkdirSync(dest);
        cb(null, dest)
    },
    filename: (req, file, cb) =>{
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({storage: storage});

router.get('/', validate_token, async (req, res)=>{
    const user = req.user;
    console.log(user);
    if(user){
        const face_model = await FaceDescriptor.findByUserId(user._id);

        res.json({user: {id: user._id, name: user.name, username: user.username, email: user.email, phone_number : user.phone_number, role: user.role, face_model_available: face_model ? true : false}});
    }else{
        res.status(400).json({error : "Invalid Token"});
    }
});

router.get('/logout', validate_token, (req, res)=>{
    if(req.user){
        console.log(req.user)
        res.clearCookie('token');
        res.send("Logged out");
    }else{
        res.status(400).json({error: "Token Invalid"});
    }
});

router.post('/login',login);
router.post('/register', [register, login]);
router.post('/change_password', validate_token, change_password);
router.post('/resetpassword', validate_token, reset_password);
router.post('/upload', validate_token, upload.array('images'),upload_images);



module.exports = router;
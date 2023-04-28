import { Typography, Box } from "@mui/material";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Btn from "../components/Btn";
import { Form, useNavigation, Navigate, redirect, useActionData } from "react-router-dom";
import { useAuth } from "../components/AuthContext/Authentication";

export default function ImageUpload(){
    const navigation = useNavigation();
    const actionData = useActionData();
    
    console.log(actionData);
    const { auth } = useAuth();
    const { user } = auth;
    const filePicker = useRef(null);
    const [ selectedFiles, setSelectedFiles ] = useState([]);
    const [ open, setOpen ] = useState(false);

    console.log(user.face_model_available);

    useEffect(()=>{
        console.log(navigation.state);
        setOpen(navigation.state === "submitting");
    }, [navigation.state])

    const handleFileChange = (e)=>{
        const files = e.target.files;
        setSelectedFiles(files);
    }
    return(
        !user.face_model_available ?
        (<Box mt={4}>
            <Typography variant="h3" sx={{textAlign: "center"}}>Finish Setting up your Account</Typography>
            <Typography variant="h5" sx={{textAlign: "center"}}>Upload images of your face</Typography>
            <Form method="POST" encType="multipart/form-data" style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                <Btn variant="contained" onClick={()=>{
                    filePicker.current.click();
                }}>Choose Images</Btn>
                <input 
                    ref={filePicker} 
                    id="images" 
                    name="images" 
                    type="file" 
                    accept="image/jpg" 
                    multiple 
                    style={{opacity: 0}}
                    onChange={handleFileChange} 
                />
                <Typography variant="p">{selectedFiles.length} images selected</Typography>
                <Btn type="submit" variant="contained" disabled={selectedFiles.length > 0 ? false : true}>Upload</Btn>
            </Form>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
                // onClick={handleClose}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </Box>) : 
        <Navigate to="/dashboard" />
    )
}

export async function action({request, params}){
    const formData = await request.formData();
    console.log(formData.get("images"));
    try{
        const res = await axios.post('/api/auth/upload', formData);
        console.log(res);
        return redirect('/dashboard');
    }catch(e){
        console.log(e);
        return res;
    }
}
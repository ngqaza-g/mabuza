import { Form, redirect, useActionData, useLoaderData } from "react-router-dom";
import axios from 'axios';
import { Add as AddIcon, Delete, Search } from "@mui/icons-material";
import { Container, Typography, Box, InputAdornment, IconButton, Fab, Modal, Card, CardMedia, Avatar, Grid, CardActions} from "@mui/material";
import InputField from "../components/InputField";
import { useState } from "react";
import Btn from "../components/Btn";
import { maxWidth } from "@mui/system";



export default function AuthorisedDrivers(){

    
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const response = useLoaderData();
    let vehicle;
    if(response){
        if(response.status === 200){
            vehicle = response.data;
            console.log(vehicle);
        }
    }

    return <Container maxWidth="lg" sx={{display: "flex", flexDirection: "column"}}>
        <Box mx="auto">
            <Typography variant="h4" component="h4" my={5}>Authorised drivers for {` ${vehicle.make} ${vehicle.model} ${vehicle.licence_plate_number}`}</Typography>
            <Grid container spacing={2} sx={{margin: "auto"}}>
                {vehicle.drivers.map(driver => (
                    <Grid item xs={6} >
                         <DriverCard name={driver.name} username={driver.username} />
                     </Grid>
                ))}
            </Grid>
            <Fab variant="extended" color="primary" aria-label="add" onClick={handleOpen} sx={{my: 5}}>
                <AddIcon />
                Add Driver
            </Fab>
            <AddDriverModal open={open} handleClose={handleClose} />
        </Box>
    </Container>
}

 const DriverCard = ({ name, username})=>{
    return <Card sx={{display: "flex", maxWidth: "350px", p: "10px"}}>
        <CardMedia sx={{mr: 3}}>
            <Avatar />
        </CardMedia>
        <Box flex={1}>
            <Typography variant="h5">
                {name}
            </Typography>
            <Typography>
                {username}
            </Typography>
        </Box>
        <Box sx={{display: "flex", justifyContent:"center"}}>
            <Form method="patch">
                <IconButton type="submit" name="driver_username" value={username}>
                    <Delete />
                </IconButton>
            </Form>
        </Box>
    </Card>
 }

 const AddDriverModal = ({open, handleClose})=>{
    const response = useActionData();

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        maxWidth: 500,
        bgcolor: 'background.paper',
        // border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };

   return <Modal
        open={open}
        onClose={handleClose}
    >
        <Box sx={style}>
            <Typography variant="h6" my={2}>Enter username of the driver you wish to add</Typography>
            <Form method="post">
                <InputField 
                    name="driver_username" 
                    id="driver_username" 
                    label="Diver Username"
                    error = {response ? (response.status !== 200 ? true : false) : false}
                    helperText = {response ? (response.status !== 200) ? response.data.error : "" : ""}
                />
                <Btn variant="contained" type="submit">Add Driver</Btn>
            </Form>
        </Box>
    </Modal>
 }

 export async function action({request, params}){
    let response = null;
    console.log(request);
    const formData = await request.formData();
    const driver = Object.fromEntries(formData);
    const { licence_plate_number } = params;
    try{
        if(request.method === "POST"){
            response = await axios.post(`/api/vehicle/add_driver/${licence_plate_number}`, driver);
        }else if(request.method === "PATCH"){
            console.log(driver);
            response = await axios.patch(`/api/vehicle/delete_driver/${licence_plate_number}`, driver);
        }
    }catch(error){
        if (error.response) {
            response = error.response;
            } else if (error.request) {
            console.log(error.request);
            } else {
            console.log('Error', error.message);
            }
    }

    console.log(response);

    return response;
 }

export async function delete_driver_action({request, params}){
    
}


export async function loader({ params }){
    const { licence_plate_number } = params;
    let response;
    try{
        response = await axios.get(`/api/vehicle/get_vehicle/${licence_plate_number}`);
    }catch(error){
        if (error.response) {
            response = error.response;
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log('Error', error.message);
          }
    }

    // console.log(response);

    return response;
}

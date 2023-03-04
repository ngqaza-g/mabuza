import { useLoaderData } from "react-router-dom";
import axios from 'axios';
import { Add as AddIcon, Search } from "@mui/icons-material";
import { Container, Typography, Box, InputAdornment, IconButton, Fab, Modal, Card, CardMedia, Avatar} from "@mui/material";
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

    return <Container maxWidth="lg" sx={{display: "flex", flexDirection: "column"}}>
        <Box mx="auto">
            <Typography variant="h4" component="h4" my={5}>Authorised drivers for {` ${vehicle.make} ${vehicle.model} ${vehicle.licence_plate_number}`}</Typography>

            <DriverCard />
            <Fab variant="extended" color="primary" aria-label="add" onClick={handleOpen} sx={{my: 5}}>
                <AddIcon />
                Add Driver
            </Fab>
        </Box>


        <Modal
            open={open}
            onClose={handleClose}
        >
            <Box sx={style}>
                <Typography variant="h6" my={2}>Enter username of the driver you wish to add</Typography>
                <InputField></InputField>
                <Btn variant="contained">Add Driver</Btn>
            </Box>
        </Modal>
    </Container>
}

 const DriverCard = ()=>{
    return <Card sx={{display: "flex", maxWidth: "300px", p: "20px"}}>
        <CardMedia sx={{mr: 3}}>
            <Avatar />
        </CardMedia>
        <Box>
            <Typography variant="h5">
                John Doe
            </Typography>
            <Typography>
                john_doe
            </Typography>
        </Box>
    </Card>
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

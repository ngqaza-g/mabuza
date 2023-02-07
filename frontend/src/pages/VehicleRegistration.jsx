import { ModelTraining } from '@mui/icons-material';
import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid  from '@mui/material/Grid';
import { useState } from 'react';
import Btn from '../components/Btn';
import InputField from '../components/InputField';

export default function VehicleRegistration(){
    const [ cars, setCars ] = useState([]);

    return <Grid container>
                <Grid item xs={6} p={2}>
                    <Registration setCars = {setCars} />
                </Grid>

                <Grid item xs={6} p={2}>
                    <RegisteredVehicles cars = {cars} />
                </Grid>
            </Grid>
}



function Registration({setCars}){

    const [ form, setForm ] = useState({})

    return <Box maxWidth="450px">
        <Typography variant="h5" component="h5" mb={2}>Register a new vehicle</Typography>
        <InputField
            id="make"
            name="make"
            label="Make"
            fullWidth
            // onChange = {()=>{
            //     setForm( prev => ()
            //         {...prev, make: e.target.value}
            //     )
            // }}
        />
        <InputField
            id="model"
            name="model"
            label="Model"
            fullWidth
        />
        <InputField
            id="licence_plate_number"
            name="licence_plate_number"
            label="Licence Plate Number"
            fullWidth
        />    
        <Btn variant='contained'>Register Vehicle</Btn>    
    </Box>
}


function RegisteredVehicles( ){
    const cars = [
        {
            make: "Toyota",
            model: "Fortuner",
            plate_number: "ABC1234"
        },
        {
            make: "Honda",
            model: "Fit Hybrid",
            plate_number: "ABC1234"
        },
        {
            make: "Nissan",
            model: "NP300",
            plate_number: "ABC1234"
        },
        {
            make: "Toyota",
            model: "Hiace",
            plate_number: "ABC1234"
        }
    ];


        return <Box>
        <Typography variant="h5" component="h5" mb={2}>Your Registered Vehicles</Typography>
        <Grid container spacing={2}>
        {cars.map(car => <RegisteredVehicleCard make={car.make} model={car.model} plate_number={car.plate_number} />)}
        </Grid>
    </Box>
}

function RegisteredVehicleCard({make, model, plate_number}){
    return <Grid item xs={6}>
    <Card sx={{maxWidth:"300px"}}>
        <CardContent>
            <Typography variant="h6" component="h6">{make}</Typography>
            <Typography variant="subtitle1" component="p">{model}</Typography>
            <Typography variant="body2" component="p">Licence Plate Number: {plate_number}</Typography>
        </CardContent>
        <CardActions>
            <Button size="small">Authorised Drivers</Button>
        </CardActions>

        <CardActions>
            <Button size="small">Remove Vehicle</Button>
        </CardActions>
    </Card>
</Grid>
}
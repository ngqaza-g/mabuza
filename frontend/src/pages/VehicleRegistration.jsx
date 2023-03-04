import { Form, useActionData, useLoaderData, Link } from 'react-router-dom';
import axios from 'axios';
import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Grid  from '@mui/material/Grid';
import { useState, useRef } from 'react';
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



function Registration(){
    const make = useRef();
    const model = useRef();
    const licence_plate_number = useRef();

    const response = useActionData();
    console.log(response);


    if(response){
        if(response.status === 200){
            make.current.value = undefined;
            model.current.value = undefined;
            licence_plate_number.current.value = undefined;
        }
    }
    return <Box maxWidth="450px">
        <Typography variant="h5" component="h5" mb={2}>Register a new vehicle</Typography>
        <Form method="post">
            <InputField
                id="make"
                name="make"
                label="Make"
                inputRef={make}
                fullWidth
            />
            <InputField
                id="model"
                name="model"
                label="Model"
                inputRef={model}
                fullWidth
            />
            <InputField
                id="licence_plate_number"
                name="licence_plate_number"
                label="Licence Plate Number"
                inputRef={licence_plate_number}
                fullWidth
            />    
            <Btn variant='contained' type="submit">Register Vehicle</Btn>    
        </Form>
    </Box>
}


function RegisteredVehicles(){

    const { data, status } = useLoaderData();

    const cars = status === 200 ? data : null;

        return <Box>
        <Typography variant="h5" component="h5" mb={2}>Your Registered Vehicles</Typography>
        <Grid container spacing={2}>
        {cars.map(car => <RegisteredVehicleCard make={car.make} model={car.model} licence_plate_number={car.licence_plate_number} />)}
        </Grid>
    </Box>
}

function RegisteredVehicleCard({make, model, licence_plate_number}){
    return <Grid item xs={6}>
    <Card sx={{maxWidth:"300px"}}>
        <CardContent>
            <Typography variant="h6" component="h6">{make}</Typography>
            <Typography variant="subtitle1" component="p">{model}</Typography>
            <Typography variant="body2" component="p">Licence Plate Number: {licence_plate_number}</Typography>
        </CardContent>
        <CardActions>
            <Button size="small">
                <Link to={`/dashboard/authorised_drivers/${licence_plate_number}`}>
                    Authorised Drivers
                </Link>
            </Button>
        </CardActions>

        <CardActions>
            <Button size="small">Remove Vehicle</Button>
        </CardActions>
    </Card>
</Grid>
}


export async function action({request, params}){
    let response;
    const formData = await request.formData();
    const vehicle = Object.fromEntries(formData);

    try{
        response = await axios.post('/api/vehicle/register', vehicle);
    }catch(error){
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx

            response = error.response;
            // console.log(error.response.data);
            // console.log(error.response.status);
            // console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
          }
    }

    return response;
}

export async function loader(){
    let response;
    try{
        response = await axios.get('/api/vehicle/get_vehicles');
    }catch(error){
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx

            response = error.response;
            // console.log(error.response.data);
            // console.log(error.response.status);
            // console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
          }
    }

    console.log(response);

    return response;
}
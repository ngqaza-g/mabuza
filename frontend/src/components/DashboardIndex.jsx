import { useEffect } from 'react';
import { Grid, Typography, Box } from "@mui/material";
import { useLoaderData } from "react-router-dom";
import ActiveDriver from "./ActiveDriver";
import axios from 'axios';
import Map from "./Map";
import { useMqtt } from "./mqttContext";

export default function DashboardIndex(){
    const { data, status } = useLoaderData();
    const cars = status === 200 ? data : null;
    const mqttClient = useMqtt();

    useEffect(()=>{
        mqttClient.on('connect', ()=>{
            mqttClient.subscribe('location');
        });

        if(cars){
            mqttClient.on('message', (topic, message)=>{
                
            });
        }
    }, [mqttClient, cars])
    return cars.length > 0 ? <Grid container spacing={2}>
        <Grid item xs={6}>
            { cars.map(car =>(
                <ActiveDriver key={car.licence_plate_number} make={car.make} model={car.model} licence_plate_number={car.licence_plate_number}/>
            ))}
        </Grid>
        <Grid item xs={6}>
            <Map />
        </Grid>
    </Grid> :
    <Box sx={{margin :"auto"}}>
        <Typography variant="h3">You have no registered nor authorised vehicles</Typography>
    </Box>
}


export async function loader(){
    let response;
    try{
        response = await axios.get('/api/vehicle/get_all_vehicles');
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
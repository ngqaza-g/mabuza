import { Button, Card, CardActions, CardContent, Container, Grid, Typography } from "@mui/material";
import { Form, useLoaderData } from "react-router-dom";
import axios from 'axios';

export default function AuthorisedVehicles(){
    const { data, status } = useLoaderData();

    const cars = status === 200 ? data : null;

    return <Container>
        
        <Grid container my={5} spacing={3}>
            {cars.length === 0 ? <Typography variant="h5" component="h5" sx={{textAlign: "center"}}>You do not have vehicles you are authorised to drive</Typography>
                : cars.map(car =>(
                    <VehicleCard make={car.make} model={car.model} licence_plate_number={car.licence_plate_number} />
                
            ))}
            </Grid>
        </Container>
}


function VehicleCard({make, model, licence_plate_number}){
    return <Grid item xs={6}>
    <Card sx={{maxWidth:"300px"}}>
        <CardContent>
            <Typography variant="h6" component="h6">{make}</Typography>
            <Typography variant="subtitle1" component="p">{model}</Typography>
            <Typography variant="body2" component="p">Licence Plate Number: {licence_plate_number}</Typography>
        </CardContent>
        <CardActions>
            <Form method='patch'>
                <Button size="small" name="licence_plate_number" value={licence_plate_number} type="submit">Remove Vehicle</Button>
            </Form>
        </CardActions>
    </Card>
</Grid>
}


export async function action({request, params}){
    let response = null;
    console.log(request);
    const formData = await request.formData();
    const { licence_plate_number }= Object.fromEntries(formData);
    try{
        response = await axios.patch(`/api/vehicle/delete_driver/${licence_plate_number}`);
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

export async function loader({params}){
    let response = null;
    try{
        response = await axios.get(`/api/vehicle/get_authorised_vehicles`);
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
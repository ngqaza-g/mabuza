import axios from 'axios';
import { useLoaderData, Link } from "react-router-dom";
import { Card, Box, Grid, Typography, CardContent, CardActions, Button } from "@mui/material";

const link_style = {
    textDecoration: "none",
    color: "inherit"
}

export default function Gallery(){
    const { data, status } = useLoaderData();
    const cars = status === 200 ? data : null;

    return (cars.length > 0 ? <Grid container spacing={2}>
        {cars.map(car =>(
            <VehicleCard car={car} />
        ))}        
    </Grid> :
    <Box sx={{margin :"auto"}}>
        <Typography variant="h3">You have no registered nor authorised vehicles</Typography>
    </Box>)


}

function VehicleCard({car}){
    const {make, model, licence_plate_number} = car;
    return <Grid item xs={3}>
    <Card sx={{maxWidth:"300px"}}>
        <CardContent>
            <Typography variant="h6" component="h6">{make}</Typography>
            <Typography variant="subtitle1" component="p">{model}</Typography>
            <Typography variant="body2" component="p">Licence Plate Number: {licence_plate_number}</Typography>
        </CardContent>
        <CardActions>
                <Button size="small" name="view-images">
                    <Link style={link_style} to={`images/${licence_plate_number}`}>
                        View Images
                    </Link>
                </Button>
        </CardActions>
    </Card>
</Grid>
}


export function Images({car}){
    const { data, status } = useLoaderData();
    const images = status === 200 ? data : null;

    return<Box>
        <Typography variant="h4" component="h4">{car.make} {Car.model} {car.licence_plate_number}</Typography>
        {
            images ? (
                <Grid container spacing={2}>
                    {
                        images.map(image => (
                            <Image src={image.src} />
                        ))
                    }
                </Grid>
            ):
            <Box sx={{margin :"auto"}}>
                <Typography variant="h3">No images captured in this vehicle</Typography>
            </Box>
        }
    </Box> 
}


function Image({src}){

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


export async function imagesLoader(){
    
    return null;
}
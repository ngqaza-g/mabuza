import { useLoaderData } from "react-router-dom";
import { Card, Box, Grid, Typography } from "@mui/material";
export default function Gallery(){
    const { data, status } = useLoaderData();
    const cars = status === 200 ? data : null;

    return (cars.length > 0 ? <Grid container spacing={2}>
        <Grid item xs={3}>
            { cars.map(car =>(
                <VehicleCard car={car} />
            ))}
        </Grid>
        
    </Grid> :
    <Box sx={{margin :"auto"}}>
        <Typography variant="h3">You have no registered nor authorised vehicles</Typography>
    </Box>)


}

function VehicleCard(car){
    return <Card maxWidth="350px">
        <Typography variant="h6">{`${car.make} ${car.model}`}</Typography>
    </Card>
}

function Image(){

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
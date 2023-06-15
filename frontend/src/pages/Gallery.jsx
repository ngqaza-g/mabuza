import { useState } from 'react';
import axios from 'axios';
import { useLoaderData, Link } from "react-router-dom";
import { Card, Box, Grid, Typography, CardContent, CardActions, Button, ImageList, ImageListItem, Backdrop, IconButton } from "@mui/material";
import { Cancel, ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
const link_style = {
    textDecoration: "none",
    color: "inherit"
}

export default function Gallery(){
    const { data, status } = useLoaderData();
    const cars = status === 200 ? data : null;

    return (cars.length > 0 ? <Grid container spacing={2}>
        {cars.map(car =>(
            <VehicleCard key={car.licence_plate_number} car={car} />
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





export function Images(){
    const [ open, setOpen ] = useState(false);
    const [ current_index, setCurrentIndex ] = useState(0);
    const { data, status } = useLoaderData();
    const {images, vehicle} = status === 200 ? data : null;

    const handleClose = ()=>{
        setOpen(false);
    }

    const openImage = (e)=>{
        setCurrentIndex(e.target.getAttribute('data-index'));
        setOpen(true);
    }
    return <Box>
        <Typography sx={{textAlign: "center"}} variant="h3" component="h4">{vehicle.make} {vehicle.model} {vehicle.licence_plate_number}</Typography>
        {
            images.length > 0 ? (
                <ImageList cols={3}>
                    {images.map((image, index)=> (
                        <Button data-index={index} onClick={openImage}>
                            <ImageListItem key={image}>
                                <img
                                    data-index={index}
                                    src={`${image}`}
                                    srcSet={`${image}`}
                                    alt={image}
                                    loading="lazy"
                                />
                            </ImageListItem>
                        </Button>
                    ))}
                </ImageList>
            ):
            <Box sx={{margin :"auto"}}>
                <Typography sx={{textAlign: "center"}} variant="h4">No images captured in this vehicle</Typography>
            </Box>
        }

        <Image open={open} images={images} setCurrentIndex={setCurrentIndex} index={current_index} handleClose={handleClose}/>
    </Box> 
}

function Image({open, handleClose, images, index, setCurrentIndex}){

    console.log(`Index: ${index}`);
    function prev(){
        setCurrentIndex(prev =>{
            if(prev === 0) return 0;
            return Number(prev) - 1
        })
    }

    function next(){
        setCurrentIndex(prev =>{
            if(prev === images.length - 1) return prev;
            return Number(prev) + 1
        })
    }

    return (
      <div>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
        >
            <Box sx={{height: "100%", width: "100%", position: "relative"}}>
                <IconButton color="inherit" sx={{position: "absolute", right: "30px", top: "30px"}} onClick={handleClose}>
                    <Cancel />
                </IconButton>

                <Grid container spacing={2}>
                    <Grid item xs={1} sx={{ display: "flex", alignItems: "center"}}>
                        <IconButton color="inherit" onClick={prev}> 
                            <ArrowBackIos />
                        </IconButton>
                    </Grid>
                    <Grid item xs={10}>
                        <Box sx={{position: "relative", top: "60px", display: "flex", justifyContent: "center", alignItems:"center"}}>
                            <img
                                style={{maxWidth: "900px"}}
                                src={images[index]}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={1} sx={{ display: "flex", alignItems: "center"}}>
                        <IconButton color="inherit" onClick={next}>
                            <ArrowForwardIos />
                        </IconButton>
                    </Grid>
                </Grid>
            </Box>
        </Backdrop>
      </div>
    );
  
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


export async function imagesLoader({params}){
    const {licence_plate_number} = params;
    let response;
    try{
        response = await axios.get(`/api/vehicle/images/${licence_plate_number}`);
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
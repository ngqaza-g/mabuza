import { useRef, useEffect, useState } from "react";
import Box  from "@mui/material/Box";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';



export default function Map(){
    const [coords, setCoords] = useState({longitude: 0, latitude: 0});
    

    useEffect(()=>{
        navigator.geolocation.getCurrentPosition(successCb, errorCb);
        mapboxgl.accessToken = 'pk.eyJ1IjoibmdxYXphLWciLCJhIjoiY2wwZ2xxZW44MDZ3MjNrcTh5b2ZzZmtvbSJ9.vLOYAuYYOkjq-uCI7d5tQA';
        new mapboxgl.Map({
            container: 'map', // container ID
            style: 'mapbox://styles/mapbox/streets-v12', // style URL
            // center: [28.5873, -20.1457,], // starting position [lng, lat]
            center: [coords.longitude, coords.latitude], // starting position [lng, lat]
            zoom: 9, // starting zoom
        });
    }, [coords]);


    function successCb(position){
        // console.log(position);
        const { longitude, latitude } = position.coords;
        // console.log(position.coords);
        setCoords({longitude, latitude});
        console.log(coords);
    }

    function errorCb(error){
        console.log(error);
    }

    return <Box id="map" sx={{maxwidth: "500px", minHeight: "400px", maxHeight: "500px"}}/>
}
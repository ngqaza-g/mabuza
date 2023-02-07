import { useRef, useEffect } from "react";
import Box  from "@mui/material/Box";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';



export default function Map(){

    useEffect(()=>{
        mapboxgl.accessToken = 'pk.eyJ1IjoibmdxYXphLWciLCJhIjoiY2wwZ2xxZW44MDZ3MjNrcTh5b2ZzZmtvbSJ9.vLOYAuYYOkjq-uCI7d5tQA';
        const map = new mapboxgl.Map({
            container: 'map', // container ID
            style: 'mapbox://styles/mapbox/streets-v12', // style URL
            center: [28.5873, -20.1457,], // starting position [lng, lat]
            zoom: 9, // starting zoom
        });
    })

    return <Box id="map" sx={{maxwidth: "500px", minHeight: "400px", maxHeight: "500px"}}/>
}
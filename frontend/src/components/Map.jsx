import { useRef, useEffect, useState } from "react";
import Box  from "@mui/material/Box";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1IjoibmdxYXphLWciLCJhIjoiY2wwZ2xxZW44MDZ3MjNrcTh5b2ZzZmtvbSJ9.vLOYAuYYOkjq-uCI7d5tQA';


export default function Map({car_locations}){
    const [userLocation, setUserLocation] = useState(null);
    const [map, setMap ] = useState(null);
    const mapContainer = useRef(null);
    // const map = useRef()

    useEffect(()=>{
        // navigator.geolocation.getCurrentPosition(successCb, errorCb);
        if(!map){
            const newMap = new mapboxgl.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/mapbox/streets-v12',
                center: [0, 0],
                zoom:9
            });
            setMap(newMap);
        }
        if(userLocation){
            const marker = new mapboxgl.Marker().setLngLat(userLocation).addTo(map);
        }
    }, [userLocation, map]);



    useEffect(()=>{
        navigator.geolocation.getCurrentPosition( position =>{
            const {latitude, longitude } = position.coords;
            const newUserLocation = [longitude, latitude];
            console.log(newUserLocation);

            setUserLocation(newUserLocation);

            map.setCenter(newUserLocation);
        },
        error =>{
            console.log(error);
        },
        {enableHighAccuracy: true}
        )
    }, [map])




    // function successCb(position){
    //     // console.log(position);
    //     const { longitude, latitude } = position.coords;
    //     console.log(position.coords);
    //     console.log(`Longitude: ${longitude}. Latitude: ${latitude}`);
    //     setCoords(prev =>({longitude, latitude}));
    //     console.log(coords);
    // }

    // function errorCb(error){
    //     console.log(error);
    // }

    return <Box ref={mapContainer} sx={{maxwidth: "500px", minHeight: "400px", maxHeight: "500px"}}/>
}
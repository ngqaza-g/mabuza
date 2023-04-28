import { useRef, useEffect, useState } from "react";
import Box  from "@mui/material/Box";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useMqtt } from "./mqttContext";

mapboxgl.accessToken = 'pk.eyJ1IjoibmdxYXphLWciLCJhIjoiY2wwZ2xxZW44MDZ3MjNrcTh5b2ZzZmtvbSJ9.vLOYAuYYOkjq-uCI7d5tQA';


export default function Map({cars}){
    const [userLocation, setUserLocation] = useState(null);
    const [userMarker, setUserMarker] = useState(null);
    const [map, setMap ] = useState(null);
    const mapContainer = useRef(null);
    const { mqttClient } = useMqtt();
    const car_markers = [];
    const markers = [];

    const bounds = new mapboxgl.LngLatBounds();

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
            markers.push(marker);
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
    }, [map]);

    useEffect(()=>{
        if(map){
            cars.forEach(car =>{
                car_markers.push({
                    license_plate_number : car.licence_plate_number,
                    marker : new mapboxgl.Marker().setLngLat([0, 0]).addTo(map)
                });
                mqttClient.subscribe(`location/${car.licence_plate_number}`);
            });

            car_markers.forEach(car_marker =>{
                markers.push(car_marker.marker);
            })
            
            
            mqttClient.on('message', (topic, message)=>{
                const { license_plate_number, coords } = JSON.parse(message.toString());
                const { marker } = car_markers.find(marker => marker.license_plate_number === license_plate_number);
                marker.setLngLat([coords.longitude, coords.latitude]);
                markers.forEach(marker => bounds.extend(marker.getLngLat()));
                map.fitBounds(bounds, { padding: { top: 50, bottom: 50, left: 50, right: 50 } });
            })
        }
    }, [cars, map]);




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
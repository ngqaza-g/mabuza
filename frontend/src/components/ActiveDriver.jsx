import { useState, useEffect } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { useMqtt } from './mqttContext';

export default function ActiveDriver({make, model, licence_plate_number }){
    const { mqttClient } = useMqtt();
    const [ driver, setDriver ] = useState({
        name: "",
        username: "",
        state: "",
    });

    useEffect(()=>{
        if(mqttClient){
            mqttClient.subscribe(`current_driver/${licence_plate_number}`);
            mqttClient.on('message', (topic, message)=>{
                console.log(message.toString());
                if(topic === `current_driver/${licence_plate_number}`){
                    try{
                        const { name, username, state} = JSON.parse(message.toString());
                        setDriver({name, username, state});
                    }catch(e){
                        console.log("Data received is corrupt");
                    }

                }
            })
        }
    })
    return <Card sx={{display: "flex", maxWidth: "350px", p: "10px", my: "20px"}}>
        <CardContent flex={1}>
            <Typography variant="h5">
                {make} {model}
            </Typography>
            <Typography variant="subtitle1">
                {licence_plate_number}
            </Typography>

            <Typography>
                {`${driver.name} ${driver.username}`}
            </Typography>
            <Typography>
                Status : {driver.state}
            </Typography>
        </CardContent>
    </Card>
}
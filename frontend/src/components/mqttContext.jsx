import { useEffect, useState, createContext, useContext } from 'react';
import mqtt from 'precompiled-mqtt';


const MQTTContext = createContext();

export function useMqtt(){
    const { mqttClient } = useContext(MQTTContext);
    if(!mqttClient){
        console.log("MQTT Client not set yet");
        // throw new Error('useMqtt must be used within a MQTTProvider');
    }

    return mqttClient;
}

export function MQTTProvider({ url, options, children}){
    const [mqttClient, setMqttClient ] = useState(null);
    const client = mqtt.connect(url, options);
    useEffect(()=>{
        // console.log(client);
        setMqttClient(client);
        client.on('connect', () => {
            console.log("CONNECTED to broker");
        });
        return ()=>{
            client.end();
        };
    }, [url, options]);


    return <MQTTContext.Provider value={{mqttClient}}>
        {console.log(mqttClient)}
        {children}
    </MQTTContext.Provider>
}
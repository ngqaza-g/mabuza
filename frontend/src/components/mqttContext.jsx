import { useEffect, useState, createContext, useContext } from 'react';
import mqtt from 'precompiled-mqtt';


const MQTTContext = createContext();

export function useMqtt(){
    const { mqttClient, status } = useContext(MQTTContext);

        if(!mqttClient){
            console.log("MQTT Client not set yet");
            // throw new Error('useMqtt must be used within a MQTTProvider');
        }


    return { mqttClient, status };
}

export function useSubscription(topic){
    const  { mqttClient } = useContext(MQTTContext);
    const [ message, setMessage ] = useState(null);
    
useEffect(()=>{
        mqttClient.subscribe(topic);
        mqttClient.on('message', (t, payload)=>{
            if(t === topic){
                setMessage({topic: t, message: payload.toString()})
            }
        });
        return ()=>{
            client.unsubscribe(topic);
        };
        
    }, [mqttClient, topic]);

    return message;
}

export function MQTTProvider({ url, options, children}){
    const [mqttClient, setMqttClient ] = useState(null);
    const [status, setStatus] = useState('disconnected');
    const client = mqtt.connect(url, options);
    useEffect(()=>{
        setMqttClient(client);
        client.on('connect', ()=>{
            setStatus('connected');
            console.log("Connected to broker");
        });

        client.on('error', (error)=>{
            setStatus('error');
            console.log(error);
        })
        return ()=>{
            client.end();
        };
    }, [url, options]);


    return <MQTTContext.Provider value={{mqttClient, status}}>
        {console.log(mqttClient)}
        {children}
    </MQTTContext.Provider>
}
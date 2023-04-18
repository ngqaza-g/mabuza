import React from 'react';
import { createRoot } from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import Authentication from './components/AuthContext/Authentication';
import { MQTTProvider } from './components/mqttContext';
import App from './App';
import './style.css';


const root = createRoot(document.getElementById("root"));


root.render(
    <Authentication>
        <MQTTProvider url="ws://localhost:9001">
            <CssBaseline />
            <App />
        </MQTTProvider>
    </Authentication>
)
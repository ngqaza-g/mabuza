import React from 'react';
import { createRoot } from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import Authentication from './components/AuthContext/Authentication';
import App from './App';
import './style.css';


const root = createRoot(document.getElementById("root"));


root.render(
    <Authentication>
        <CssBaseline />
        <App />
    </Authentication>
)
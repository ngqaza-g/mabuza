import Box from '@mui/material/Box';
import Typography  from '@mui/material/Typography';
import { Container } from '@mui/system';
import { Outlet, useOutlet } from 'react-router-dom';
import Navbar from './Navbar';
export default function Dashboard(){

    return<Box>
        <Navbar />
        <Container maxWidth="lg">
            <Outlet />
        </Container>
    </Box>
}
import { Grid, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { Container } from '@mui/system';
import { Outlet } from 'react-router-dom';
import ChangePassword from '../components/settings_componets/ChangePassword';
import ProfilePicture from '../components/settings_componets/ProfilePicture';
import UserDetails from '../components/settings_componets/UserDetails';


export default function Settings(){
    return <Container maxWidth="md">
        <Typography variant='h4' component="h4" my={5}>Profile Settings</Typography>
            <Outlet />
    </Container>
}


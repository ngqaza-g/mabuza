import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Card, CardActions, CardContent, CardMedia, Typography, Button } from '@mui/material';

export default function ActiveDriver({make, model, licence_plate_number, driver_name, driver_username }){
    return <Card sx={{display: "flex", maxWidth: "350px", p: "10px", my: "20px"}}>
        <CardContent flex={1}>
            <Typography variant="h5">
                {make} {model}
            </Typography>
            <Typography variant="subtitle1">
                {licence_plate_number}
            </Typography>

            <Typography>
                John Doe john_doe
            </Typography>
            <Typography>
                Status : Driving
            </Typography>
        </CardContent>
    </Card>
}
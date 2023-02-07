import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Card, CardActions, CardContent, CardMedia, Typography, Button } from '@mui/material';

export default function ActiveDriver(){
    return <Box sx={{maxWidth: "300px"}}>
        <Card>
            <CardMedia>
                <Avatar sx={{margin:"auto", width: "150px", height: "150px"}}>
                    <AccountCircle sx={{ 
                        height: "100%",
                        width: "100%",  }} />
                </Avatar>
            </CardMedia>
            <CardContent>
                <Typography variant='subtitle1' component="p" my={2}>John Doe</Typography>
                <Typography variant="body1" component="p">Status: Driving</Typography>
            </CardContent>
            <CardActions>
                <Button>Request Vehicle</Button>
            </CardActions>
        </Card>
    </Box>
}
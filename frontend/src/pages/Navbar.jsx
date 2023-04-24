import { useState } from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography  from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Menu, MenuItem, IconButton, Modal } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../components/AuthContext/Authentication';

const link_style = {
    textDecoration: "none",
    color: "inherit"
}


const nav_items = [
    <Link style={link_style} to="/dashboard">
        Dashboard
    </Link>,
    <Link style={link_style} to="register_vehicle">
        Register Vehicle
    </Link>,
    <Link style={link_style} to="authorised_vehicles">
        Authorised Vehicles
    </Link> 
];

export default function Navbar(){

    const [anchorEl, setAnchorEl] = useState(null);
    const [openNotification, setOpen] = useState(false);
    const handleOpenNotification = () => setOpen(true);
    const handleCloseNotification = () => setOpen(false);

    const { setAuth } = useAuth();

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };

      async function logout(){
        setAnchorEl(null);
        const response = await fetch('/logout');
        if(response.status === 200) setAuth({status: false, user:{}});
        else{
            const data = await response.json();
            alert(data.error);
        }
      }
    
    return <Box mb={10}>
        <AppBar>
            <Toolbar>
            <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2, display: {xs: "block", md: "none"} }}
          >
            <MenuIcon />
          </IconButton>

                <Typography variant="h5" component="h5" mr={2}>LOGO</Typography>
                <Box sx={{flexGrow: 1}}/>

                <Box display={{xs : 'none', md: 'flex'}}>
                    {nav_items.map( nav_item => (
                        <Button key={Math.floor(Math.random()*100000)} color="inherit" my={2} display="block">{nav_item}</Button>
                    ))}
                </Box>

                <IconButton color="inherit" onClick={handleOpenNotification}>
                    <Badge badgeContent={17} color="error">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>

                <IconButton color="inherit" onClick={handleMenu}>
                    <Avatar sx={{bgcolor: 'inherit'}}>
                        <AccountCircle fontSize="large" />
                    </Avatar>
                </IconButton>
            </Toolbar>
        </AppBar>

        <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
        >
            <MenuItem onClick={handleClose}><Link to="settings" style={{textDecoration: "none", color: "inherit"}}>Settings</Link></MenuItem>
            <MenuItem onClick={logout}>Sign Out</MenuItem>
        </Menu>

        <Drawer
            anchor="top"
            open={false}
        >
        <List>
        {nav_items.map(list_item => (
            <ListItem key={Math.floor(Math.random()*100000)} >
                <ListItemButton>
                    <ListItemText>
                        {list_item}
                    </ListItemText>
                </ListItemButton>
            </ListItem>
        ))}
        </List>

        </Drawer>

        <NotificationCenter open={openNotification} handleClose={handleCloseNotification} />
    </Box> 
}



function NotificationCenter({open, handleClose}){
    const style = {
        position: 'absolute',
        top: "65px",
        right: 0,
        // transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #fff',
        boxShadow: 24,
        p: 3,
      };

      return <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={style}>
                    <Box sx={{ textAlign: "center"}}>
                        <Typography variant="h5" component="h2">
                            Notification Centre
                        </Typography>

                    </Box>

                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </Typography>
                </Box>
            </Modal>

}
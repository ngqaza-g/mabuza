import Box from '@mui/material/Box';
import { CameraAlt } from '@mui/icons-material';
import { blue, red } from '@mui/material/colors';
import { Avatar, IconButton, InputLabel, Input, Typography } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle'
import { useRef, useState } from 'react';
export default function ProfilePicture(){

    const [img, setImg] = useState(null);
    const avatarRef = useRef(null);

    function handleFileUpload(e){
        if(e.target.files && e.target.files[0]){
            const reader = new FileReader();
            
            reader.onload = function(element){
                setImg(element.target.result); 
            }

            reader.readAsDataURL(e.target.files[0]);
        }
    }

    return <Box ml="auto">

        <Typography variant="h6" my={3}>Update Profile Picture</Typography>
                <Box sx={{
                height: "200px",
                width: "200px",
                borderRadius : "50%",
                position: 'relative',
                // backgroundColor: red[500],
            }
            }>

                <Avatar
                    src = {img ? img : ""}
                    sx={{
                    height: "100%",
                    width: "100%",
                    
                }}>
                   {!img ? <AccountCircle sx={{                    
                        height: "100%",
                        width: "100%",      
                    }} /> : <Box />
                    }
                </Avatar>

                <label htmlFor="avatar">
                    <Box sx={{
                        position: 'absolute',
                        bottom : -10,
                        right: -10,
                    }}>
                    { /*<IconButton sx={{}}> */}
                        <CameraAlt fontSize='large'/>
                    {/* </IconButton> */}

                    </Box>
                </label>

                <Input
                    id="avatar"
                    name="avatar"
                    type="file"
                    sx={{display:"none"}}
                    onChange ={handleFileUpload}
                />
            
            </Box>
        </Box>

}


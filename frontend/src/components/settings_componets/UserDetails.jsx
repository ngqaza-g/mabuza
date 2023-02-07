import Box  from "@mui/material/Box";
import InputField from "../InputField";
import Typography from "@mui/material/Typography";
import Btn from "../Btn";
import { Link } from "react-router-dom";

export default function UserDetails(){
    return <Box sx={{maxWidth: "350px"}}>
        <Typography variant="h6" my={3}></Typography>
        <InputField
            id="name"
            name="name"
            label="Name"
            fullWidth
        />
        <InputField
            id="username"
            name="username"
            label="Username"
            fullWidth
        />
        <InputField
            id="email"
            name="email"
            label="Email"
            fullWidth
        />

        <Btn variant="contained">Update</Btn>
        <Btn p={0}>
            <Link to="change_password" style={{textDecoration: "none", color:"inherit"}}>
                Change Password
            </Link>
        
        </Btn>
    </Box>
}
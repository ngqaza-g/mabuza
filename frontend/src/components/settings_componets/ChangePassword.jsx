import { Form, useNavigate } from "react-router-dom";
import InputField from "../InputField";
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import styled from "@emotion/styled";
import { Typography } from "@mui/material";

const Btn = styled(Button)({
    display: "block",
    margin: "8px 0"
})

export default function ChangePassword(){

    const navigate = useNavigate();

    return <Box sx={{ maxWidth: "450px", margin: "auto"}}>
                <Typography component="h6" variant="h6" my={2}>Change Password</Typography>
                <Form>
                    <InputField 
                        id="current_password"
                        name="current_passowrd"
                        label="Current Password"
                        fullWidth
                    />

                    <InputField 
                        id="new_password"
                        name="new_passowrd"
                        label="New Password"
                        fullWidth
                    />

                    <InputField 
                        id="confirm_new_password"
                        name="confirm_new_passowrd"
                        label="Confirm New Password"
                        fullWidth
                    />

                    <Btn variant="contained">Change Password</Btn>
                    <Btn p={0} onClick={()=>{
                        navigate(-1);
                    }}>
                        Cancel
                    </Btn>
                </Form>
        </Box>
}


export function action({request, params}){

}
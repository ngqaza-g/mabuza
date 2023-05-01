import { useEffect, useState } from 'react';
import { Form, useActionData, Link } from 'react-router-dom';
import { useAuth } from '../components/AuthContext/Authentication';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export default function Register(){
    const { setAuth } = useAuth();
    const action_data = useActionData();

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);


    useEffect(()=>{
      if(action_data) {
        if(action_data.status === 200) setAuth({status: true, user: action_data.user});
      }
    });

    return (<Container maxWidth="xs">
        <Typography variant="h4" component="h6" my={3}>Sign up</Typography>

        <Form method="post">

        <TextField
            id="name"
            name="name"
            label="Name"
            required
            fullWidth      
        /><p />
          <TextField
            id="username"
            name="username"
            label="Username"
            error = {action_data ? (action_data.status === 404): false}
            helperText = {action_data ? (action_data.status === 404 ? action_data.error : "" ): ""}
            fullWidth      
          /><p />
          <TextField
            id="email"
            name="email"
            label="Email"
            error = {action_data ? (action_data.status === 404): false}
            helperText = {action_data ? (action_data.status === 404 ? action_data.error : "" ): ""}
            fullWidth      
          />
          <p />
          <TextField
            id="phone_number"
            name="phone_number"
            label="Phone Number"
            error = {action_data ? (action_data.status === 404): false}
            helperText = {action_data ? (action_data.status === 404 ? action_data.error : "" ): ""}
            fullWidth      
          />
          <p />
          <TextField
            id="password"
            name="password"
            label="Password"
            fullWidth
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment:(
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <p />
          <TextField
            id="confirm_password"
            name="confirm_password"
            label="Confirm Password"
            fullWidth
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment:(
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <p />
          <Button variant="contained" sx={{display: "block", mb: 2}} type="submit">Sign up</Button>
          <Button sx={{p: 0}}>
            <Link to="/login" style={{textDecoration: "none", color: "inherit"}}>I have an account</Link>
            </Button>
        </Form>
    </Container>);
}

export async function action ({request, params}){
    let data = await request.formData();
    data = Object.fromEntries(data);
    console.log(data);
    const response = await fetch('/api/auth/register', {
        method : "POST",
        headers: {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(data)
     });

    data = await response.json();

    console.log(data);

    return {status: response.status, ...data}
}
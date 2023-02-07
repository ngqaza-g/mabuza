import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from '../components/AuthContext/Authentication';
import Footer from './Footer';

export default function Root(){

    const { setAuth } = useAuth();
    const [ isTokenChecked, setIsTokenChecked ] = useState(false);
    const navigate = useNavigate();
    const { pathname } = useLocation();

    useEffect(()=>{
        const validate_token = async() =>{
            const response = await fetch('/api/auth');

            try{
                const data = await response.json();
                if(response.status === 200){
                    setAuth({status : true, user: data.user});
                    if(pathname === '/' || pathname === '/login') navigate('/dashboard');
                    else navigate(pathname);
                }else{                                    
                    navigate('/login');
                }
            }catch(err){
                console.log(err);
                navigate('/login');
            }
            
            setIsTokenChecked(true);
        }

        validate_token();

    }, []);

    return isTokenChecked ? <Box sx={{display: "flex", flexDirection: "column", height: "100vh"}}>
        <Box sx={{flexGrow: 1}}>
            <Outlet />
        </Box>
        <Footer />
    </Box> : <Loading />
}

function Loading(){
    return <div style={{width : "100%", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center"}}>
        <h1>Loading</h1>
    </div>
}
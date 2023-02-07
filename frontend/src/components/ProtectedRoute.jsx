import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext/Authentication';

export default function ProtectedRoute({children, isProtected = true}){
    const { auth } = useAuth();

    const { status } = auth

    console.log("Log in status ", status);
    console.log(`Protected status `, isProtected);

    return isProtected ? (status ? children : <Navigate to="/login" />) : (status ? <Navigate to="/dashboard" /> : children);
}
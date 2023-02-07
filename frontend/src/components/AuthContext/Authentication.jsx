import { useState, createContext, useContext } from 'react';

const AuthenticationContext = createContext();
const SetAuthenticationContext = createContext();


export function useAuth(){
    const auth = useContext(AuthenticationContext);
    const setAuth = useContext(SetAuthenticationContext);

    return {auth, setAuth};
}

export default function Authentication({children}){

    const [ auth, setAuth ] = useState({status: false, user: {}});

    return <AuthenticationContext.Provider value={auth}>
        <SetAuthenticationContext.Provider value = {setAuth}>
            {children}
        </SetAuthenticationContext.Provider>
    </AuthenticationContext.Provider>
}
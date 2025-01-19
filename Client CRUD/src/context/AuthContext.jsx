import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest } from "../api/auth";

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context){
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setisAuthenticated] = useState(false);
    const [registerErrors, setRegisterErrors] = useState([]);
    const [singinErrors, setSinginErrors] = useState([]);

    const singup =  async (user) => {
        try {
            const res = await registerRequest(user);
            setUser(res.data);
            setisAuthenticated(true);
        } catch (error) {
            setRegisterErrors(error.response.data);
        }
    }

    const singin =  async (user) => {
        try {
            const res = await loginRequest(user);
            setUser(res.data);
            console.log(res);
        } catch (error) {
            console.log(error.response.data);
            if (Array.isArray(error.response.data.message)){
                setSinginErrors(error.response.data.message);
            }
            setSinginErrors([error.response.data.message]);
        }
    }

    useEffect(() => {
        if (singinErrors.length > 0){
            const timer = setTimeout(() => {
                setSinginErrors([]);
            }, 3000)
            return () => clearTimeout(timer);
        }
    }, [singinErrors])

    
    useEffect(() => {
        if (registerErrors.length > 0){
            const timer = setTimeout(() => {
                setSinginErrors([]);
            }, 3000)
            return () => clearTimeout(timer);
        }
    }, [registerErrors])

  return (
    <AuthContext.Provider 
    value={{singup, 
    user, 
    isAuthenticated, 
    registerErrors, 
    singin, 
    singinErrors
    }}>
        {children}
    </AuthContext.Provider>
  )
}

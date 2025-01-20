import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, verifyTokenRequest } from "../api/auth";
import Cookies from 'js-cookie'

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
    const [loading, setLoading] = useState(true)

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
            setisAuthenticated(true);
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

    useEffect(() => {
        async function checkLogin() {
            const cookies = Cookies.get();

            if(!cookies.token) {
                setisAuthenticated(false)
                setLoading(false)
                return setUser(null)
            }
                try {
                    const res = await verifyTokenRequest(cookies.token)
                    if (!res.data) {
                        setisAuthenticated(false)
                        setLoading(false)
                        return
                    }
    
                    setisAuthenticated(true)
                    setUser(res.data)
                    setLoading(false)
                } catch (error) {
                    setisAuthenticated(false)
                    setLoading(false)
                }
            
        }
        checkLogin()
    }, [])

  return (
    <AuthContext.Provider 
    value={{singup, 
    user, 
    isAuthenticated, 
    registerErrors, 
    singin, 
    singinErrors,
    loading
    }}>
        {children}
    </AuthContext.Provider>
  )
}

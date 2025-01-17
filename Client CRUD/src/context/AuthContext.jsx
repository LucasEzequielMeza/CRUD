import { createContext, useState, useContext } from "react";
import { registerRequest } from "../api/auth";

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

    const singup =  async (user) => {
        try {
            const res = await registerRequest(user);
            setUser(res.data);
            setisAuthenticated(true);
        } catch (error) {
            setRegisterErrors(error.response.data);
        }
    }

  return (
    <AuthContext.Provider value={{singup, user, isAuthenticated, registerErrors}}>
        {children}
    </AuthContext.Provider>
  )
}

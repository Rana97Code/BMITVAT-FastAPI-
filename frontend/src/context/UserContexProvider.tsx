import React, { useState,useEffect } from "react";
import {useNavigate} from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import UserContex from "./UserContex";

const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const navigate = useNavigate();


    const [token, setToken] = useState<any>();
    const [email, setUserEmail] = useState<any>();

    useEffect(() => {
        // Check if user data exists in localStorage
        const storedUser = localStorage.getItem('Token');
        if (storedUser) {
            const jwt = jwtDecode(storedUser);
            var sub = jwt.sub;
            var email = (jwt as any).user_email;
        //   setUser(JSON.parse(email as any)); 
          setToken(storedUser as any); 
          setUserEmail(email as any); 
        }else{
            navigate("/");
        }
      }, []); // for one time value get


    return (
        <UserContex.Provider value={{token,email}}>
            {children}
        </UserContex.Provider>
    )
}
export default UserContextProvider;



import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from "jwt-decode";  
import UserContext from "./UserContex";

const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const navigate = useNavigate();
    const [base_url, setBaseUrl] = useState<string | null >(null);
    // const [base_url, setBaseUrl] = useState<string>('http://127.0.0.1:8000');
    const [token, setToken] = useState<string | null>(null);
    const [headers, setHeaders] = useState<any | null>(null);
    const [email, setUserEmail] = useState<string | null>(null);

    useEffect(() => {
        const baseUrl = import.meta.env.VITE_APP_BASE_URL;  
        if (baseUrl) {
            setBaseUrl(baseUrl);
        } else {
            console.error("REACT_APP_BASE_URL environment variable is not set");
        }

        const storedUser = localStorage.getItem('Token');
        if (storedUser) {
            try {
                const jwt: any = jwtDecode(storedUser);
                const userEmail = jwt.user_email;
                const jsonToken = JSON.parse(storedUser);
                const authHeaders = { Authorization: `Bearer ${jsonToken}` };

                setToken(jsonToken);
                setHeaders(authHeaders);
                setUserEmail(userEmail);
            } catch (error) {
                console.error("Error decoding token:", error);
                navigate("/");
            }
            // finally{
                
            // }
        } else {
            navigate("/");
        }
    }, [navigate]);

    return (
        <UserContext.Provider value={{ base_url, token, headers, email }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;

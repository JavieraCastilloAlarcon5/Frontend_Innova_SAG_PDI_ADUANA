import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";

const requireAuth = () => {
    const { auth } = useContext(AuthContext);  
    const location = useLocation(); 

    return (
        auth?.user 
            ? <Outlet /> 
            : <Navigate to="/" state={{ from: location }} replace />
    )



}

export default requireAuth; 
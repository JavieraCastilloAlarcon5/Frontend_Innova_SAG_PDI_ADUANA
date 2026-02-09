import { use, useContext } from "react"
import AuthProvider from "../auth/AuthProvider"

const useRefreshToken = () => {
    return useContext(AuthProvider); 
}; 

export default useRefreshToken; 
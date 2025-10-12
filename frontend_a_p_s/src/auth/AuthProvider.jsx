import { useEffect , useState} from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";
function AuthProvider({ children }) {
    const [data, setData] = useState(localStorage.getItem('data') || null);
    const [logged, setLogged] = useState(localStorage.getItem('logged') === 'true' || false);

    function logout() {
        console.log(data.username + ' ha cerrado sesión');
        setData(null)
        setLogged(false)
    }

    useEffect(() => {
        localStorage.setItem('data', data);
        localStorage.setItem('logged', logged);
    }, [data, logged]);

    return (
        <AuthContext.Provider value={{ logout, data, setData, logged, setLogged }}>
            {children}
        </AuthContext.Provider>
    );
    }
export default AuthProvider;
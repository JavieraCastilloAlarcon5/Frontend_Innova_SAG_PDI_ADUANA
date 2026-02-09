import { useEffect , useState} from "react";
import { AuthContext } from "./AuthContext";

function AuthProvider({ children }) {
    const [ auth, setAuth ] = useState({}); 
    const storedData = localStorage.getItem('data');
    const [data, setData] = useState(storedData ? JSON.parse(storedData) : null);
    const [logged, setLogged] = useState(localStorage.getItem('logged') === 'true' || false);

    function logout() {
        console.log(data.username + ' ha cerrado sesión');
        setData(null)
        setLogged(false)
    }

    useEffect(() => {
        localStorage.setItem('data', JSON.stringify(data));
        localStorage.setItem('logged', logged);
    }, [data, logged]);

    return (
        <AuthContext.Provider value={{ logout, data, setData, logged, setLogged, auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
    }
export default AuthProvider;
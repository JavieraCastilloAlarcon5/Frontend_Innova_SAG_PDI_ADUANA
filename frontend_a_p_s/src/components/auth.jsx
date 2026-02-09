import { useContext, useState } from 'react';
import AuthForm from './login';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';



const accessWithAxios = async (route, credentials, URL, setters) => {
  const { setData, setLogged, setError, navigate } = setters;

  try {
    const response = await axios.post(`${URL}/auth/${route}`, credentials, {
      withCredentials: true
    });
    const accessToken = response?.data?.accessToken
    setData(response.data.user);
    setLogged(true);
    setError('');
    navigate('/informacion');
  } catch (err) {
    setError('Error al ingresar. Intenta nuevamente.');
  }
};

const Auth = ({ onAuthSuccess }) => {
  const [authType, setAuthType] = useState('login'); 
  const [error, setError] = useState('');
  const { setLogged, setData } = useContext(AuthContext);
  const navigate = useNavigate();;
  const URL = 'http://localhost:3000';

  const handleAuth = (username,email, password, role) => {
    const setters = { setData, setLogged, setError, navigate };
    const credentials = { username, email, password, role };

    accessWithAxios(authType, credentials, URL, setters);
  };

  const toggleAuthType = () => {
    setAuthType(authType === 'login' ? 'signup' : 'login');
  };

  return (
    <div className="auth-container">
      <AuthForm type={authType} onSubmit={handleAuth} />
      <p className="toggle-link">
        {authType === 'login' ? '¿No tienes una cuenta?' : '¿Ya tienes una cuenta?'}
        <span onClick={toggleAuthType}>
          {authType === 'login' ? ' Regístrate' : ' Inicia sesión'}
        </span>
      </p>
    </div>
  );
}

export default Auth;
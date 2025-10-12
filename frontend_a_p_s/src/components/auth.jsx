import React, { useContext, useState } from 'react';
import AuthForm from './login';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';

const Auth = ({ onAuthSuccess }) => {
  const [authType, setAuthType] = useState('login'); 
  const [error, setError] = useState('');
  const { data, setLogged, setData } = useContext(AuthContext);
  const navigate = useNavigate();;
  const URL = 'http://localhost:3000';
  const handleAuth = (username,email, password, role) => {
    if (authType === 'signup') {
      axios
        .post(`${URL}/users/signup`, {
          username,
          email,
          password,
          role
        })
        .then(response => {
          console.log('Signup Successful');
          setData(response.data.user);
          setLogged(true);
          setError('');
          navigate('/informacion');
        })
        .catch(err => {
          setError('Error al crear la cuenta. Intenta nuevamente.');
        });
    } else {
      axios
        .post(`${URL}/users/login`, {
          username,
          email,
          password
        })
        .then(response => {
          console.log('Login Successful');
          setData(response.data.user);
          console.log(response.data.user.accountType);
          setLogged(true);
          setError('');
          navigate('/informacion')
        })
        .catch(err => {
          setError('Error al iniciar sesión. Intenta nuevamente.');
        });
    }
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
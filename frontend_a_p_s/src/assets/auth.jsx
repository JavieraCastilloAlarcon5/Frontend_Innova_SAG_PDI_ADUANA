import React, { useState } from 'react';
import AuthForm from './login';

const Auth = ({ onAuthSuccess }) => {
  const [authType, setAuthType] = useState('login'); 
  const [error, setError] = useState('');

  const handleAuth = (email, password, accountType) => {
    setError('');

    const isLogin = authType === 'login';
    const url = isLogin ? '/api/login' : '/api/signup';
    
    const payload = isLogin 
      ? { email, password }
      : { email, password, accountType }; 

    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then(response => {
        if (!response.ok) throw new Error('Network response failed or server error');
        return response.json();
      })
      .then(data => {
        if (data.success) { 
          const user = { accountType: data.user?.accountType || 'Aduana' };
          onAuthSuccess(user); 
        } else {
          setError(data.message || 'Error de autenticación, verifica tus credenciales.');
        }
      })
      .catch(error => {
        console.error('Error en la conexión con el backend:', error);
        setError('No se pudo conectar con el servidor API. Usando simulación.');
        
        setTimeout(() => {
             const user = { accountType: isLogin ? 'Aduana' : accountType };
             onAuthSuccess(user);
        }, 500);
      });
  };

  const toggleAuthType = () => {
    setAuthType(authType === 'login' ? 'signup' : 'login');
    setError(''); 
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
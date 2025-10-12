import React, { useState } from 'react';
import './login.css'

function AuthForm({ type, onSubmit }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accountType, setAccountType] = useState('Aduana'); 

  const isLogin = type === 'login';
  const title = isLogin ? 'Iniciar Sesión' : 'Crear Cuenta';
  const buttonText = isLogin ? 'Entrar' : 'Registrarse';

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(username, email, password, accountType);
  };

  return (
    <div className="auth-form-container">
      <h2>{title}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {!isLogin && (
          <div className="form-group">
            <label htmlFor="accountType">Tipo de Cuenta:</label>
            <select
              id="accountType"
              value={accountType}
              onChange={(e) => setAccountType(e.target.value)}
            >
              <option value="Aduana">Aduana</option>
              <option value="PDI">PDI</option>
              <option value="SAG">SAG</option>
            </select>
          </div>
        )}

        <button type="submit" className="submit-btn">{buttonText}</button>
      </form>
    </div>
  );
}

export default AuthForm;
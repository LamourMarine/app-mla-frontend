// src/components/Login.jsx
import { useContext, useState } from 'react';
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';
import api from '../api';

function Login() {
  const { login } = useContext(AuthContext);
  const  navigate  = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post("/login_check", { email, password});
      login (response.data.token) // Redirection après connexion

      navigate("/products");
    } catch (err) {
      setError('Email ou mot de passe incorrect');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Mot de passe"
        required
      />
      {error && <p style={{color: 'red'}}>{error}</p>}
      <button type="submit">Se connecter</button>
    </form>
  );
}

export default Login;



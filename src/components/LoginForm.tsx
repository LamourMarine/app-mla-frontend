// src/components/Login.jsx
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../api";

function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post("/login_check", {
        username: email, // ← Changé de email à username
        password,
      });
      login(response.data.token); // Redirection après connexion

      navigate("/products");
    } catch (err) {
      setError("Email ou mot de passe incorrect");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-auto mt-12">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-4 w-full max-w-sm mx-auto"
      >
        <input
          className="w-full bg-emerald-500 text-white placeholder-white/70 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-700"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />

        <input
          className="w-full bg-emerald-500 text-white placeholder-white/70 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-700"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mot de passe"
          required
        />

        {error && <p className="text-red-500">{error}</p>}

        <button
          type="submit"
          className="bg-amber-500 text-white rounded-md px-4 py-2 hover:bg-amber-600 transition"
        >
          Se connecter
        </button>
      </form>
    </div>
  );
}

export default Login;

import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import api from "../api";

type User = {
  id: number;
  name: string;
  photo: string | null;
  address: string;
  email: string;
  roles: string[];
};

interface AuthContextType {
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (token: string) => void;
  logout: () => void;
  token: string | null;
  user: User | null;
  loading: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isAdmin: false,
  login: () => {},
  logout: () => {},
  token: null,
  user: null,
  loading: true,
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const isAdmin = user?.roles.includes("ROLE_ADMIN") ?? false;

  // Charge au montage initial
  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    api
      .get("/users/me")
      .then((res) => setUser(res.data))
      .catch(() => {
        setToken(null);
        localStorage.removeItem("token");
      })
      .finally(() => setLoading(false));
  }, []);

const login = async (newToken: string) => {
  localStorage.setItem("token", newToken);
  setToken(newToken);

  try {
    const res = await api.get("/users/me", {
      headers: { Authorization: `Bearer ${newToken}` },
    });

    setUser({
      id: res.data.id,
      name: res.data.name,
      photo: res.data.photo,
      address: res.data.address,
      email: res.data.email,
      roles: res.data.roles,
    });
    console.log("Utilisateur connecté :", res.data);
  } catch (error) {
    console.error("Erreur lors du chargement de l’utilisateur :", error);
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  }
};
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        isAdmin,
        login,
        logout,
        token,
        user,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

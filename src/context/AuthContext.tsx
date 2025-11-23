import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import api from "../api";
import { useAppDispatch } from "../store/hooks";
import { loadCart, clearCart } from "../store/cartSlice";
import { setLoadingCart } from "../store";

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
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const isAdmin = user?.roles.includes("ROLE_ADMIN") ?? false;
  const dispatch = useAppDispatch();

  // Charge au montage initial
useEffect(() => {
  if (!token) {
    setLoading(false);
    return;
  }

  api
    .get("/users/me")
    .then((res) => {
      setUser(res.data);
      
      // Charger le panier après avoir récupéré l'utilisateur
      const savedCart = localStorage.getItem(`cart_${res.data.id}`);
      if (savedCart) {
        try {
          const cartData = JSON.parse(savedCart);
          if (cartData && Array.isArray(cartData.items)) {
            dispatch(loadCart({ items: cartData.items }));
            console.log("Panier rechargé au démarrage pour user", res.data.id);
          }
        } catch (error) {
          console.error("Erreur chargement panier:", error);
        }
      }
    })
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

      const userData = {
        id: res.data.id,
        name: res.data.name,
        photo: res.data.photo,
        address: res.data.address,
        email: res.data.email,
        roles: res.data.roles,
      };

      setUser(userData);
      console.log("Utilisateur connecté :", res.data);

      //Charger le panier de cet utilisateur
      const savedCart = localStorage.getItem(`cart_${userData.id}`);
      if (savedCart) {
        try {
          const cartData = JSON.parse(savedCart);
          // Vérifier que cartData a bien la structure attendue
          if (cartData && Array.isArray(cartData.items)) {
            setLoadingCart(true);
            dispatch(loadCart({ items: cartData.items }));
            setTimeout(() => setLoadingCart(false), 100);
            console.log("Panier chargé pour user", userData.id);
          } else {
            // Structure invalide, panier vide
            dispatch(clearCart());
          }
        } catch (parseError) {
          console.error("Erreur parsing panier:", parseError);
          dispatch(clearCart());
        }
      } else {
        // Pas de panier sauvegardé
        dispatch(clearCart());
        console.log("Nouveau panier vide pour user", userData.id);
      }
    } catch (error) {
      console.error("Erreur lors du chargement de l'utilisateur :", error);
      setUser(null);
      setToken(null);
      localStorage.removeItem("token");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);

    dispatch(clearCart());
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

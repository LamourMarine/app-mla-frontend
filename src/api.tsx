// src/api.tsx
import axios from 'axios';
import type { AxiosInstance } from 'axios';
import type { Product } from './Types/product';


// URL de base de l'API
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
export const ASSETS_BASE_URL = 'http://localhost:8000';

// Créer l'instance Axios
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Intercepteur pour ajouter le token automatiquement
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Intercepteur pour gérer les erreurs
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Types TypeScript
interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  name:string;
  email: string;
  password: string;
  address: string;
  phone_number: string;
  userType: 'producteur' | 'structure';
}

interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];
}

interface OrderItem {
  productId: number;
  quantity: number;
}

interface CreateOrderData {
  items: OrderItem[];
}

// ==================== AUTHENTIFICATION ====================

export const authAPI = {
  // Connexion
  login: async (credentials: LoginCredentials) => {
    const url = `${API_BASE_URL}/login_check`;
    console.log('🔍 API_BASE_URL:', API_BASE_URL);
    console.log('🔍 URL complète appelée:', url);
    
    const response = await axios.post(`${API_BASE_URL}/login_check`, credentials);
    
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      const user = decodeToken(response.data.token);
      localStorage.setItem('user', JSON.stringify(user));
    }
    return response.data;
  },

  // Inscription
  register: async (data: RegisterData) => {
    const response = await axios.post(`${API_BASE_URL}/register`, data);
    return response.data;
  },

  // Déconnexion
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Récupérer l'utilisateur courant
  getCurrentUser: (): User | null => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  // Vérifier si connecté
  isAuthenticated: (): boolean => {
    const token = localStorage.getItem('token');
    if (!token) return false;
    
    try {
      const decoded = decodeToken(token);
      return decoded.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  },

  // Vérifier un rôle
  hasRole: (role: string): boolean => {
    const user = authAPI.getCurrentUser();
    return user?.roles?.includes(role) || false;
  },

  // Vérifier si producteur
  isProducteur: (): boolean => {
    return authAPI.hasRole('ROLE_PRODUCTEUR');
  },

  // Vérifier si structure
  isStructure: (): boolean => {
    return authAPI.hasRole('ROLE_STRUCTURE');
  },
};

export const producerAPI = {
  getAll: async () => {
    const response = await api.get('/producers');
    return response.data;
  },
  
  getProducts: async (producerId: number) => {
    const response = await api.get(`/products?seller=${producerId}`);
    return response.data;
  }
};

// ==================== PRODUITS ====================

export const productAPI = {
  // Récupérer tous les produits
  getAll: async () => {
    const response = await api.get<Product[]>('/products');
    return response.data;
  },

  // Récupérer un produit par ID
  getById: async (id: number) => {
    const response = await api.get<Product>(`/products/${id}`);
    return response.data;
  },

  // Créer un produit (producteur uniquement)
  create: async (productData: Partial<Product>) => {
    const response = await api.post<Product>('/products', productData);
    return response.data;
  },

  // Modifier un produit
  update: async (id: number, productData: Partial<Product>) => {
    const response = await api.put<Product>(`/products/${id}`, productData);
    return response.data;
  },

  // Supprimer un produit
  delete: async (id: number) => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  },
};

// ==================== COMMANDES ====================

export const orderAPI = {
  // Créer une commande
  create: async (orderData: CreateOrderData) => {
    const response = await api.post('/orders', orderData);
    return response.data;
  },

  // Récupérer les commandes de l'utilisateur connecté
  getMyOrders: async () => {
    const response = await api.get('/orders');
    return response.data;
  },

  // Récupérer une commande par ID
  getById: async (id: number) => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },
};

// ==================== CATÉGORIES ====================

export const categoryAPI = {
  getAll: async () => {
    const response = await api.get('/categories');
    return response.data;
  },
};

// ==================== UTILITAIRES ====================

// Décoder le token JWT
const decodeToken = (token: string): any => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
};

export default api;
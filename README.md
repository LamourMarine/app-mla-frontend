# 🌾 Cantine Verte - Frontend

Interface web pour la plateforme de vente de produits locaux aux cantines scolaires.

## 📋 Prérequis

- Node.js 18+
- npm

## 🚀 Installation

### 1. Cloner le projet

```bash
git clone https://github.com/LamourMarine/app-mla-frontend.git
cd app-mla-frontend
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configurer l'environnement

Créer un fichier `.env` à la racine :

```env
VITE_API_URL=http://localhost:8000/api
```

### 4. Lancer le serveur de développement

```bash
npm run dev
```

L'application est accessible sur `http://localhost:5173`

## 📱 Pages disponibles

- `/` - Page d'accueil
- `/login` - Connexion
- `/register` - Inscription
- `/products` - Catalogue de produits
- `/producers` - Liste des producteurs
- `/cart` - Panier (à venir)

## 🛠️ Technologies

- **Framework** : React 18
- **Langage** : TypeScript
- **Styling** : Tailwind CSS
- **Routing** : React Router v6
- **HTTP Client** : Axios
- **Icons** : Lucide React
- **Build Tool** : Vite

## 🎨 Design

- **Palette** : Verts, oranges, jaunes (thème agricole)
- **Style** : Moderne, gradients, cards avec ombres
- **Responsive** : Mobile-first avec Tailwind

## 📦 Structure du projet

```
src/
├── api.tsx              # Configuration Axios et endpoints
├── components/          # Composants réutilisables
│   ├── Footer.tsx
│   ├── LoginForm.tsx
│   ├── Navbar.tsx
│   ├── ProducerCard.tsx
│   └── ProducersCarrousel.tsx
│   ├── ProductCard.tsx
├── pages/               # Pages principales
│   ├── Home.tsx
│   ├── Products.tsx
│   ├── Producers.tsx
│   ├── LoginPage.tsx
│   └── Register.tsx
├── Types/   
│   └── category.ts            # Types TypeScript
│   └── producers.ts
│   └── product.ts
└── Layout.tsx           # Layout général
```

## 🔐 Authentification

Le token JWT est stocké dans `localStorage` et automatiquement ajouté aux requêtes via un intercepteur Axios.

## 🎯 Fonctionnalités

- ✅ Authentification (connexion/inscription/déconnexion)
- ✅ Catalogue de produits avec filtrage par catégorie
- ✅ Page producteurs avec carrousel de produits
- ✅ Design responsive
- 🚧 Panier d'achat (en cours)
- 🚧 Gestion de commandes (à venir)

## 🧪 Scripts disponibles

```bash
npm run dev          # Lancer en développement
npm run build        # Build pour production
npm run preview      # Preview du build
npm run lint         # Linter ESLint
```

## 📝 Notes

- Les images sont servies depuis le backend (`/uploads/products/`)
- Le backend doit être lancé sur `http://localhost:8000`
- CORS doit être configuré côté backend
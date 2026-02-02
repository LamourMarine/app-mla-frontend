# 🌾 Cantine Verte - Frontend

Web interface connecting local producers with school canteens. Browse local products, manage your cart, and place orders directly from producers.

## Prerequisites

- Node.js 18+
- npm or yarn

## Installation

### 1. Clone the project
```bash
git clone https://github.com/LamourMarine/app-mla-frontend.git
cd app-mla-frontend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment

Create a `.env` file at the root:
```env
VITE_API_URL=http://localhost:8000/api
VITE_FRONT_URL=http://localhost:5173
```

### 4. Start development server
```bash
npm run dev
```

The application is accessible at `http://localhost:5173`

## Available Pages

- `/` - Home page
- `/login` - Login
- `/register` - Registration
- `/products` - Product catalog
- `/producers` - Producers list
- `/cart` - Shopping cart
- `/order-confirmation` - Order confirmation
- `/admin` - Admin dashboard (admin only)
- `/producer/products` - My products (producers only)

## Technologies

- **Framework**: React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **State Management**: Redux Toolkit
- **HTTP Client**: Axios
- **Notifications**: React Hot Toast
- **Build Tool**: Vite

## Related Projects

- [Backend API](https://github.com/LamourMarine/app-mla-backend) - Symfony REST API

## Design

- **Color Palette**: Greens, oranges, yellows (agricultural theme)
- **Style**: Modern, gradients, cards with shadows
- **Responsive**: Mobile-first with Tailwind breakpoints

## Project Structure
```
src/
├── components/          # Reusable components
│   ├── AdminRoute.tsx
│   ├── CartItem.tsx
│   ├── Footer.tsx
│   ├── LoginForm.tsx
│   ├── Navbar.tsx
│   ├── ProducerCard.tsx
│   ├── ProductCard.tsx
│   └── Toast.tsx
├── context/
│   └── AuthContext.tsx  # Authentication context
├── layouts/
│   └── Layout.tsx       # Main layout
├── pages/               # Main pages
│   ├── producer/
│   │   ├── ProducerProductsList.tsx
│   │   ├── ProductCreatePage.tsx
│   │   └── ProductEditPage.tsx
│   ├── AdminDashboard.tsx
│   ├── Cart.tsx
│   ├── Home.tsx
│   ├── LoginPage.tsx
│   ├── OrderConfirmation.tsx
│   ├── Producers.tsx
│   ├── Products.tsx
│   └── Register.tsx
├── store/               # Redux store
│   ├── cartSlice.ts
│   ├── hooks.ts
│   ├── index.ts
│   └── producerSlice.ts
│   └── productsSlice.ts
├── Types/               # TypeScript types
│   ├── category.ts
│   ├── producer.ts
│   ├── product.ts
│   └── unit.ts
├── api.ts               # Axios configuration and API endpoints
├── App.css
├── App.tsx
├── index.css
├── main.tsx
└── vite-env.d.ts
```
## Authentication

The JWT token is stored in `localStorage` and automatically added to requests via an Axios interceptor.

## Features

- ✅ Authentication (login/register/logout)
- ✅ Product catalog with category filtering
- ✅ Producers page with product carousel
- ✅ Shopping cart with localStorage persistence
- ✅ Order creation and confirmation
- ✅ Producer validation system (admin)
- ✅ Producer dashboard (manage products)
- ✅ Admin dashboard (manage producers)
- ✅ Responsive design
- ✅ Toast notifications

## User Roles

- **Structure/Canteen**: Can browse products and place orders
- **Producer**: Can manage their products (requires admin approval)
- **Admin**: Can validate producers, deactivate accounts

## Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## Deployment

### Production
- **Frontend**: https://cantineverte.netlify.app
- **Backend API**: https://app-mla-backend.onrender.com
- **Database**: Supabase (PostgreSQL)

### Environment Variables for Production
Configure on Netlify:
- `VITE_API_URL`: https://app-mla-backend.onrender.com/api
- `VITE_FRONT_URL`: https://cantineverte.netlify.app

## Technical Notes

- Product images are served from the backend (`/images/`)
- The backend must be running for the app to work
- CORS is configured on the backend side
- Cart data is persisted per user in localStorage
- Redux Toolkit is used for global state management

## Author

**Marine Lamour** - Backend Developer  
[Portfolio](https://ml-dev.netlify.app)

## License

This project is open source and available under the MIT License.

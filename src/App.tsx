import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'; // ⬅️ AJOUTE CETTE LIGNE
import Home from './pages/Home';
import Layout from './layouts/Layout';
import Logo from './assets/logo_2.png';
import LoginPage from './pages/LoginPage';
import Products from './pages/Products';
import Producers from './pages/Producers';
import Register from './pages/Register';
import ProducerProductsList from './pages/producer/ProducerProductsList';
import ProductCreatePage from './pages/producer/ProductCreatePage';
import { ProductEditPage } from './pages/producer/ProductEditPage';
import { AdminRoute } from './components/AdminRoute';
import  AdminDashboard  from "./pages/AdminDashboard";
import Cart from './pages/Cart';
import OrderConfirmation from "./pages/OrderConfirmation";

function App() {
  return (
    <Router>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#10b981',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
      
      <Layout logo={Logo}>
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={<Products />} />
          <Route path="/producers" element={<Producers/>} />
          <Route path="/producer/products" element={<ProducerProductsList />} />
          <Route path="/producer/products/create" element={<ProductCreatePage />} />
          <Route path="/producer/products/edit/:id" element={<ProductEditPage />} />
          <Route path="/admin" element={<AdminRoute> <AdminDashboard /> </AdminRoute>} />
          <Route path="/cart" element={<Cart />} /> 
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
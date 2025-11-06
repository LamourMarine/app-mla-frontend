import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <Router>
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
      </Routes>
      </Layout>
    </Router>
  )
}

export default App

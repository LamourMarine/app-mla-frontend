import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Layout from './layouts/Layout';
import Logo from './assets/logo_2.png';
import LoginPage from './pages/LoginPage';
import Products from './pages/Products';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <Layout logo={Logo}>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<Products />} />
      </Routes>
      </Layout>
    </Router>
  )
}

export default App

import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Layout from './components/Layout';
import Logo from './assets/logo.png';
import LoginPage from './pages/LoginPage';
import Products from './pages/Products';
import Producers from './pages/Producers';

function App() {
  return (
    <Router>
      <Layout logo={Logo}>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/login" element={<LoginPage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/producers" element={<Producers />} />
      </Routes>
      </Layout>
    </Router>
  )
}

export default App

import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../api";

interface NavbarProps {
  logo: string;
  className?: string;
}

const Navbar = ({ logo }: NavbarProps) => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout(); // Nettoie le localStorage
    navigate("/");
  };
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  return (
    <nav className="fixed top-0 left-0 w-full bg-zinc-800 text-white flex items-center justify-between p-4">
      <img src={logo} alt="Cantine Verte" className="h-12" />
      <ul className="hidden md:flex gap-4">
        <li>
          <Link to="/">Accueil</Link>
        </li>
        <li>
          <Link to="/products">Produits</Link>
        </li>
        <li>
          <Link to="/producers">Producteurs</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        {isAuthenticated ? (
          <li>
            <button onClick={handleLogout} className="text-white">
              Se déconnecter
            </button>
          </li>
        ) : (
          <li>
            <Link to="/login">Connexion</Link>
          </li>
        )}
      </ul>
      {/* Menu mobile (burger) */}

      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white focus:outline-none"
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Menu mobile déroulant */}
      {isOpen && (
        <ul
          className={`md:hidden absolute top-full left-0 w-full bg-zinc-900/50 backdrop-blur-lg border border-white/30 shadow-xl px-6 py-4 space-y-3 font-medium z-50 ${
            scrolled ? "text-zinc-300" : "text-zinc-100"
          }`}
        >
          <li>
            <Link to="/" onClick={() => setIsOpen(false)}>
              Accueil
            </Link>
          </li>
          <li>
            <Link to="/products" onClick={() => setIsOpen(false)}>
              Produits
            </Link>
          </li>
          <li>
            <Link to="/producers" onClick={() => setIsOpen(false)}>
            Producteur
            </Link>
          </li>
          <li>
            <Link to="/contact" onClick={() => setIsOpen(false)}>
              Contact
            </Link>
          </li>{" "}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;

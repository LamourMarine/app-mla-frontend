import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

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
    setIsOpen(false);
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
    <nav className="bg-gradient-to-r from-green-600 via-emerald-500 to-green-600 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
      <img src={logo} alt="Cantine Verte" className="w-[100px] h-[100px] mt-[4vh]" />
      </div>
      <ul className="hidden md:flex space-x-8">
        <li>
          <Link to="/" className="text-white hover:text-amber-200 font-semibold transition-colors">Accueil</Link>
        </li>
        <li>
          <Link to="/products" className="text-white hover:text-amber-200 font-semibold transition-colors">Produits</Link>
        </li>
        <li>
          <Link to="/producers" className="text-white hover:text-amber-200 font-semibold transition-colors">Producteurs</Link>
        </li>
        <li>
          <Link to="/contact"className="text-white hover:text-amber-200 font-semibold transition-colors">Contact</Link>
        </li>
        <div className="ml-auto">
        {isAuthenticated ? (
            <div className="flex items-center space-x-4">
          <li>
            <button onClick={handleLogout} className="bg-white text-green-600 px-4 py-2 rounded-lg font-semibold hover:bg-amber-100 transition-all shadow-md">
              Se déconnecter
            </button>
          </li>
            </div>
        ) : (
          <li>
            <Link to="/login">Connexion</Link>
          </li>
        )}
        </div>
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
                  {isAuthenticated ? (
          <li>
            <button onClick={handleLogout} className="text-white">
              Se déconnecter
            </button>
          </li>
        ) : (
          <li>
            <Link to="/login" onClick={() => setIsOpen(false)}>Connexion</Link>
          </li>
        )}

        </ul>
      )}
    </nav>
  );
};

export default Navbar;

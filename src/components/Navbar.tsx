import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


interface NavbarProps {
  logo: string;
  className?: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  roles: string[];
  address?: string;
  phone_number?: string;
  photo?: string | null;
}

const Navbar = ({ logo }: NavbarProps) => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout, loading } = useContext(AuthContext);

if (loading) return <div>Chargement...</div>;

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
    <nav className="bg-[#002A22] sticky top-0 z-50">
      <div className="max-w-9/10 mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center space-x-4">
        {user && <span className="text-white">Bonjour {user.name}</span>}
      </div>
        <div className="flex justify-between items-center h-16">
          <img
            src={logo}
            alt="Cantine Verte"
            className="w-[50px] h-[40px] mt-[1.5vh]"
            />
            <p className="text-[#3ab54a] font-bold text-lg md:text-2xl md:text-2xl text-nav-text italic mb-2 md:mb-0 md:ml-6 md:mr-auto md:mt-4 text-center md:text-left">
              Cantine Verte</p>
        </div>
        <ul className="hidden md:flex flex-row items-center space-x-8 ml-auto pb-2">
          <li>
            <Link
              to="/"
              className="text-white hover:text-amber-200 font-semibold transition-colors"
            >
              Accueil
            </Link>
          </li>
          <li>
            <Link
              to="/products"
              className="text-white hover:text-amber-200 font-semibold transition-colors"
            >
              Produits
            </Link>
          </li>
          <li>
            <Link
              to="/producers"
              className="text-white hover:text-amber-200 font-semibold transition-colors"
            >
              Producteurs
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="text-white hover:text-amber-200 font-semibold transition-colors"
            >
              Contact
            </Link>
          </li>
          <div className="hidden md:flex flex-row items-center space-x-8 ml-auto">
          {isAuthenticated ? (
            <>
              <li>
                <button
                  onClick={handleLogout}
                  className="btn cursor-pointer bg-white text-[#002A22] px-4 py-2 rounded-lg font-semibold hover:bg-amber-100 transition-all shadow-md"
                >
                  Se déconnecter
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/login"
                  className="btn bg-white text-[#002A22] px-4 py-2 rounded-lg font-semibold hover:bg-amber-100 transition-all shadow-md"
                >
                  Connexion
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="btn bg-white text-[#002A22] px-4 py-2 rounded-lg font-semibold hover:bg-amber-100 transition-all shadow-md"
                >
                  Créer un compte
                </Link>
              </li>
            </>
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
              <button onClick={handleLogout} className="text-white bg-white/50 rounded-lg font-bold px-2 py-2">
                Se déconnecter
              </button>
            </li>
          ) : (
            <li>
              <Link to="/login" onClick={() => setIsOpen(false)}>
                Connexion
              </Link>
            </li>
          )}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;

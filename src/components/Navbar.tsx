import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

interface NavbarProps {
  logo: string;
  className?: string;
}

const Navbar = ({ logo }: NavbarProps) => {
  const navigate = useNavigate();
  const { isAdmin } = useContext(AuthContext);
  const {
    user,
    isAuthenticated,
    logout: authLogout,
    loading,
  } = useContext(AuthContext);

  const [isOpen, setIsOpen] = useState(false);
  const cartItems = useAppSelector((state) => state.cart.items);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (loading) {
    return (
      <nav className="bg-[#002A22] sticky top-0 z-50">
        <div className="h-16 flex items-center justify-center text-white">
          Chargement...
        </div>
      </nav>
    );
  }

  const handleLogout = () => {
    authLogout();
    navigate("/");
    setIsOpen(false);
  };
  return (
    <nav className="bg-[#002A22] sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo + Nom */}
          <div className="flex items-center gap-4">
            <img src={logo} alt="Cantine Verte" className="w-12 h-10" />
            <p className="text-emerald-400 font-bold text-xl italic whitespace-nowrap">
              Cantine Verte
            </p>
          </div>
          {/* Menu Desktop */}
          <ul className="nav-show hiden items-center gap-4">
            <li>
              <Link
                to="/"
                className="text-white hover:text-emerald-400 font-medium transition-colors"
              >
                Accueil
              </Link>
            </li>
            <li>
              <Link
                to="/products"
                className="text-white hover:text-emerald-400 font-medium transition-colors"
              >
                Produits
              </Link>
            </li>
            <li>
              <Link
                to="/producers"
                className="text-white hover:text-emerald-400 font-medium transition-colors"
              >
                Producteurs
              </Link>
            </li>

            {/* Visible seulement si producteur connecté */}
            {user?.roles?.includes("ROLE_PRODUCTEUR") && (
              <li>
                <Link
                  to="/producer/products"
                  className="text-white hover:text-emerald-400 font-medium transition-colors"
                >
                  Mes produits
                </Link>
              </li>
            )}

            <li>
              <Link
                to="/contact"
                className="text-white hover:text-emerald-400 font-medium transition-colors"
              >
                Contact
              </Link>
            </li>

            {/* Visible seulement si admin */}
            {isAdmin && (
              <li>
                <Link
                  to="/admin"
                  className="text-white hover:text-emerald-400 font-medium transition-colors"
                >
                  Dashboard
                </Link>
              </li>
            )}

            {isAuthenticated && (
              <li className="relative">
                <Link
                  to="/cart"
                  className="text-white hover:text-emerald-400 font-medium transition-colors flex items-center gap-1"
                >
                  🛒 Panier
                  {totalItems > 0 && (
                    <span className="bg-emerald-400 text-[#002A22] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </Link>
              </li>
            )}

            {/* Séparateur visuel */}
            <div className="h-6 w-px bg-white/20 mx-2" />

            {/* User info */}
            {isAuthenticated ? (
              <>
                <li>
                  <span className="text-emerald-400 font-medium">
                    🌿 {user?.name}
                  </span>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-white text-[#002A22] rounded-lg font-medium hover:bg-emerald-50 transition-colors"
                  >
                    Déconnexion
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/login"
                    className="px-4 py-2 text-white hover:text-emerald-400 font-medium transition-colors"
                  >
                    Connexion
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="px-4 py-2 bg-white text-[#002A22] rounded-lg font-medium hover:bg-emerald-50 transition-colors"
                  >
                    Créer un compte
                  </Link>
                </li>
              </>
            )}
          </ul>

          {/* Section droite mobile : User + Panier + Burger */}
          <div className="nav-hide flex items-center gap-4">
            {isAuthenticated && user && (
              <span className="text-emerald-400 font-medium text-sm">
                🌿 {user.name}
              </span>
            )}

            {/* Panier mobile uniquement */}
            {isAuthenticated && (
              <Link
                to="/cart"
                className="text-white hover:text-emerald-400 font-medium transition-colors flex items-center gap-1"
              >
                🛒
                {totalItems > 0 && (
                  <span className="bg-emerald-400 text-[#002A22] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
            )}

            {/* Burger menu mobile */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white text-2xl focus:outline-none"
            >
              {isOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile déroulant */}
      {isOpen && (
        <div className="nav-hide bg-[#002A22] border-t border-white/10">
          <ul className="px-4 py-4 space-y-3">
            <li>
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className="block text-white hover:text-emerald-400 font-medium transition-colors py-2"
              >
                Accueil
              </Link>
            </li>
            <li>
              <Link
                to="/products"
                onClick={() => setIsOpen(false)}
                className="block text-white hover:text-emerald-400 font-medium transition-colors py-2"
              >
                Produits
              </Link>
            </li>
            <li>
              <Link
                to="/producers"
                onClick={() => setIsOpen(false)}
                className="block text-white hover:text-emerald-400 font-medium transition-colors py-2"
              >
                Producteurs
              </Link>
            </li>

            {user?.roles?.includes("ROLE_PRODUCTEUR") && (
              <li>
                <Link
                  to="/producer/products"
                  onClick={() => setIsOpen(false)}
                  className="block text-white hover:text-emerald-400 font-medium transition-colors py-2"
                >
                  Mes produits
                </Link>
              </li>
            )}

            <li>
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="block text-white hover:text-emerald-400 font-medium transition-colors py-2"
              >
                Contact
              </Link>
            </li>

            {isAdmin && (
              <li>
                <Link
                  to="/admin"
                  onClick={() => setIsOpen(false)}
                  className="block text-white hover:text-emerald-400 font-medium transition-colors py-2"
                >
                  Dashboard
                </Link>
              </li>
            )}

            {/* Séparateur */}
            <div className="h-px bg-white/10 my-3" />

            {isAuthenticated ? (
              <>
                <li className="text-emerald-400 font-medium py-2">
                  🌿 {user?.name}
                </li>
                <li>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="w-full px-4 py-2 bg-white text-[#002A22] rounded-lg font-medium hover:bg-emerald-50 transition-colors text-center"
                  >
                    Déconnexion
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="block text-white hover:text-emerald-400 font-medium transition-colors py-2"
                  >
                    Connexion
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-2 bg-white text-[#002A22] rounded-lg font-medium hover:bg-emerald-50 transition-colors text-center"
                  >
                    Créer un compte
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

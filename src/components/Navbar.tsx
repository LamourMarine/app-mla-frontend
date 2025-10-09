import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

interface NavbarProps {
  logo: string;
}

const Navbar = ({ logo }: NavbarProps) => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  return (
    <nav className="fixed top-0 left-0 w-full bg-zinc-800 text-white flex items-center justify-between p-4">
      <img src={logo} alt="Cantine Verte" className="h-12" />
      <ul className="flex gap-4">
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
            <button onClick={logout} className="text-white">
              Se déconnecter
            </button>
          </li>
        ) : (
          <li>
            <Link to="/login">Connexion</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;

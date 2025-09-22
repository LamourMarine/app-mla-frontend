import { Link } from 'react-router-dom';

interface NavbarProps {
  logo: string;
}

const Navbar = ({ logo }: NavbarProps) => (
  <nav className="fixed top-0 left-0 w-full bg-zinc-800 text-white flex items-center justify-between p-4">
    <img src={logo} alt="Cantine Verte" className="h-12" />
    <ul className="flex gap-4">
      <li><Link to="/">Accueil</Link></li>
      <li><Link to="/products">Produits</Link></li>
      <li><Link to="/producers">Producteurs</Link></li>
      <li><Link to="/contact">Contact</Link></li>
    </ul>
  </nav>
);

export default Navbar;

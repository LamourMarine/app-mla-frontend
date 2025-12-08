// src/components/Footer.tsx
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#002A22] text-white">
      {/* Section principale */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Colonne 1 : Description */}
          <div className="md:col-span-2 text-center md:text-left">
              <p className="text-emerald-400 font-bold text-xl italic mb-4">
                Cantine Verte
              </p>
            <p className="text-gray-300 text-sm leading-relaxed max-w-md mx-auto md:mx-0">
              Des produits frais et locaux pour des cantines engagées. 
              Soutenez les producteurs de votre région tout en offrant 
              une alimentation saine et de qualité.
            </p>
          </div>

          {/* Colonne 2 : Navigation */}
          <div>
            <h3 className="font-semibold text-white mb-4">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-300 hover:text-emerald-400 transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-300 hover:text-emerald-400 transition-colors">
                  Produits
                </Link>
              </li>
              <li>
                <Link to="/producers" className="text-gray-300 hover:text-emerald-400 transition-colors">
                  Producteurs
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-emerald-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Colonne 3 : Liens utiles */}
          <div>
            <h3 className="font-semibold text-white mb-4">Informations</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-emerald-400 transition-colors">
                  À propos
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-emerald-400 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/cgv" className="text-gray-300 hover:text-emerald-400 transition-colors">
                  CGV
                </Link>
              </li>
              <li>
                <Link to="/mentions-legales" className="text-gray-300 hover:text-emerald-400 transition-colors">
                  Mentions légales
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Barre du bas : Copyright */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-sm text-gray-400">
            <p>© 2025 Cantine Verte. Tous droits réservés.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-emerald-400 transition-colors">
                Politique de confidentialité
              </a>
              <span>•</span>
              <a href="#" className="hover:text-emerald-400 transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
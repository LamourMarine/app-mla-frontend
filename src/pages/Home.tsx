// src/pages/Home.tsx
import { useNavigate } from "react-router-dom";
import { Leaf, Users, ShoppingCart, Star, Sparkles } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { useContext, useState, useEffect } from "react";
import homePageImage from "../assets/home_page.jpg";

function Home() {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="home-page bg-gradient-to-b from-white to-green-50/30">
      {/* HERO SECTION */}
      <section className="hero relative h-screen overflow-hidden">
        {/* Image avec parallax */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${homePageImage})`,
          }}
        >
          {/* Overlay gradient moderne */}
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/60 via-gray-900/50 to-green-900/70"></div>
        </div>

        {/* Contenu */}
        <div className="relative z-10 flex flex-col justify-center items-center h-full text-white px-4">
          <div className="max-w-5xl text-center space-y-8 animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-sm font-medium">
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span>Circuit court • Produits locaux • Livraison rapide</span>
            </div>

            {/* Titre principal */}
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
              Des Produits Locaux
              <br />
              <span className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Directement à votre Cantine
              </span>
            </h1>

            {/* Sous-titre */}
            <p className="text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto font-light">
              Connectez votre établissement aux meilleurs producteurs de votre
              région
            </p>

            {/* Boutons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <button
                onClick={() => navigate("/products")}
                className="group relative px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl font-semibold text-lg text-white hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105"
              >
                <span className="flex items-center gap-2">
                  🛒 Découvrir les produits
                </span>
              </button>

              {isAuthenticated ? (
                <button
                  onClick={() => navigate("/products")}
                  className="group relative px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl font-bold text-lg text-gray-900 hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
                >
                  <span className="flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5" />
                    Commander maintenant
                  </span>
                </button>
              ) : (
                <button
                  onClick={() => navigate("/register")}
                  className="group relative px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl font-bold text-lg text-gray-900 hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
                >
                  <span className="flex items-center gap-2">
                    ✨ Créer un compte
                  </span>
                </button>
              )}
            </div>
          </div>

          {/* Scroll indicator */}
          {scrollY < 100 && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
              <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-2">
                <div className="w-1 h-3 bg-white/60 rounded-full"></div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* AVANTAGES */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              Pourquoi choisir{" "}
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Cantine Verte
              </span>{" "}
              ?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Une plateforme pensée pour faciliter l'approvisionnement local
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Avantage 1 */}
            <div className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-green-400/5 to-emerald-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Leaf className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">
                  100% Local
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Tous nos producteurs sont situés dans un rayon de 50km.
                  Fraîcheur et qualité garanties !
                </p>
              </div>
            </div>

            {/* Avantage 2 */}
            <div className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400/5 to-amber-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">
                  Circuit Court
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Commandez directement aux producteurs. Pas d'intermédiaire,
                  meilleurs prix pour tous !
                </p>
              </div>
            </div>

            {/* Avantage 3 */}
            <div className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 to-indigo-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <ShoppingCart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">
                  Simple & Rapide
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Commandez en quelques clics. Livraison assurée directement
                  dans votre établissement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PLATS DU JOUR */}
      <section className="py-24 px-4 bg-gradient-to-br from-orange-50/50 via-yellow-50/30 to-green-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              🍽️ Idées de Plats du Jour
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Inspirez-vous de nos suggestions avec des produits de saison
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Plat 1 */}
            <div className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="h-56 bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-8xl relative overflow-hidden">
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                <span className="relative group-hover:scale-110 transition-transform duration-500">
                  🥗
                </span>
              </div>
              <div className="p-6 space-y-4">
                <h3 className="text-2xl font-bold text-gray-900">
                  Salade Fermière
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Laitue bio, tomates cerises, carottes râpées, œufs du terroir
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                    🥬 Légumes
                  </span>
                  <span className="px-3 py-1.5 bg-yellow-100 text-yellow-700 rounded-full text-sm font-semibold">
                    🥚 Œufs
                  </span>
                </div>
              </div>
            </div>

            {/* Plat 2 */}
            <div className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="h-56 bg-gradient-to-br from-orange-400 to-red-600 flex items-center justify-center text-8xl relative overflow-hidden">
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                <span className="relative group-hover:scale-110 transition-transform duration-500">
                  🍲
                </span>
              </div>
              <div className="p-6 space-y-4">
                <h3 className="text-2xl font-bold text-gray-900">
                  Ratatouille Maison
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Aubergines, courgettes, poivrons et tomates du potager
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                    🥒 Légumes
                  </span>
                  <span className="px-3 py-1.5 bg-red-100 text-red-700 rounded-full text-sm font-semibold">
                    🍅 Tomates
                  </span>
                </div>
              </div>
            </div>

            {/* Plat 3 */}
            <div className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="h-56 bg-gradient-to-br from-yellow-400 to-orange-600 flex items-center justify-center text-8xl relative overflow-hidden">
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                <span className="relative group-hover:scale-110 transition-transform duration-500">
                  🍎
                </span>
              </div>
              <div className="p-6 space-y-4">
                <h3 className="text-2xl font-bold text-gray-900">
                  Compote de Saison
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Pommes et poires fraîches du verger local
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="px-3 py-1.5 bg-red-100 text-red-700 rounded-full text-sm font-semibold">
                    🍎 Fruits
                  </span>
                  <span className="px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                    🌱 Bio
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TÉMOIGNAGES */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              💬 Ils nous font confiance
            </h2>
            <p className="text-xl text-gray-600">
              Découvrez les retours de nos partenaires
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Témoignage 1 */}
            <div className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-green-400/5 to-emerald-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative space-y-6">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-gray-700 text-lg leading-relaxed italic">
                  "Grâce à Cantine Verte, nous proposons désormais des menus
                  100% locaux à nos élèves. Les parents sont ravis et les
                  enfants adorent !"
                </p>
                <div className="flex items-center gap-4 pt-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-3xl shadow-md">
                    👩‍🍳
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-lg">
                      Sophie Martin
                    </p>
                    <p className="text-gray-600">
                      Responsable cantine, École Pasteur
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Témoignage 2 */}
            <div className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400/5 to-amber-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative space-y-6">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-gray-700 text-lg leading-relaxed italic">
                  "Interface simple, produits de qualité et livraison
                  ponctuelle. Exactement ce dont nous avions besoin pour notre
                  établissement."
                </p>
                <div className="flex items-center gap-4 pt-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full flex items-center justify-center text-3xl shadow-md">
                    👨‍💼
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-lg">
                      Jean Dupont
                    </p>
                    <p className="text-gray-600">
                      Directeur, Collège Jean Moulin
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;

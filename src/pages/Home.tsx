// src/pages/Home.tsx
import { useNavigate } from "react-router-dom";
import { Leaf, Users, ShoppingCart, Star } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

function Home() {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div className="home-page">
      {/* HERO SECTION */}
      <section className="hero relative h-screen">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url(public/images/home_page.jpg)",
            filter: "brightness(0.7)",
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/30 to-emerald-800/30" />
        <div className="relative z-10 flex items-center justify-center h-full text-white px-4">
          <div className="max-w-4xl text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              🌾 Des Produits Locaux
              <br />
              <span className="text-yellow-300">
                Directement à votre Cantine
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-green-50">
              Connectez votre établissement aux producteurs de votre région
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/products")}
              className="bg-white text-green-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-100 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              🛒 Découvrir les produits
            </button>
            {isAuthenticated ? (
              <button
                onClick={() => navigate("/products")}
                className="bg-yellow-400 text-gray-800 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-500 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                🛒 Commander maintenant
              </button>
            ) : (
              <div className="bg-yellow-400 text-gray-800 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-500 transition-all shadow-lg hover:shadow-xl transform hover:scale-105">
                <button onClick={() => navigate("/register")}>
                  ✨ Créer un compte
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* AVANTAGES */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            Pourquoi choisir Cantine Verte ?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Avantage 1 */}
            <div className="text-center p-6 rounded-2xl bg-green-50 border-2 border-green-200 hover:shadow-lg transition-all">
              <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">
                100% Local
              </h3>
              <p className="text-gray-600">
                Tous nos producteurs sont situés dans un rayon de 50km.
                Fraîcheur et qualité garanties !
              </p>
            </div>

            {/* Avantage 2 */}
            <div className="text-center p-6 rounded-2xl bg-orange-50 border-2 border-orange-200 hover:shadow-lg transition-all">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">
                Circuit Court
              </h3>
              <p className="text-gray-600">
                Commandez directement aux producteurs. Pas d'intermédiaire,
                meilleurs prix pour tous !
              </p>
            </div>

            {/* Avantage 3 */}
            <div className="text-center p-6 rounded-2xl bg-blue-50 border-2 border-blue-200 hover:shadow-lg transition-all">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">
                Simple & Rapide
              </h3>
              <p className="text-gray-600">
                Commandez en quelques clics. Livraison assurée directement dans
                votre établissement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PLATS DU JOUR SUGGÉRÉS */}
      <section className="py-16 px-4 bg-gradient-to-br from-yellow-50 to-orange-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">
            🍽️ Idées de Plats du Jour
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            Inspirez-vous de nos suggestions avec des produits de saison
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Plat 1 */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:scale-105">
              <div className="h-48 bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-6xl">
                🥗
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-800">
                  Salade Fermière
                </h3>
                <p className="text-gray-600 mb-4">
                  Laitue bio, tomates cerises, carottes râpées, œufs du terroir
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                    🥬 Légumes
                  </span>
                  <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-semibold">
                    🥚 Œufs
                  </span>
                </div>
              </div>
            </div>

            {/* Plat 2 */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:scale-105">
              <div className="h-48 bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-6xl">
                🍲
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-800">
                  Ratatouille Maison
                </h3>
                <p className="text-gray-600 mb-4">
                  Aubergines, courgettes, poivrons et tomates du potager
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                    🥒 Légumes
                  </span>
                  <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">
                    🍅 Tomates
                  </span>
                </div>
              </div>
            </div>

            {/* Plat 3 */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:scale-105">
              <div className="h-48 bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-6xl">
                🍎
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-800">
                  Compote de Saison
                </h3>
                <p className="text-gray-600 mb-4">
                  Pommes et poires fraîches du verger local
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">
                    🍎 Fruits
                  </span>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                    🌱 Bio
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TÉMOIGNAGES */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            💬 Ils nous font confiance
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Témoignage 1 */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl border-2 border-green-200 shadow-md">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic text-lg">
                "Grâce à Cantine Verte, nous proposons désormais des menus 100%
                locaux à nos élèves. Les parents sont ravis et les enfants
                adorent !"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-2xl">
                  👩‍🍳
                </div>
                <div>
                  <p className="font-bold text-gray-800">Sophie Martin</p>
                  <p className="text-sm text-gray-600">
                    Responsable cantine, École Pasteur
                  </p>
                </div>
              </div>
            </div>

            {/* Témoignage 2 */}
            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-8 rounded-2xl border-2 border-orange-200 shadow-md">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic text-lg">
                "Interface simple, produits de qualité et livraison ponctuelle.
                Exactement ce dont nous avions besoin pour notre établissement."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-2xl">
                  👨‍💼
                </div>
                <div>
                  <p className="font-bold text-gray-800">Jean Dupont</p>
                  <p className="text-sm text-gray-600">
                    Directeur, Collège Jean Moulin
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-20 px-4 bg-gradient-to-r from-green-600 to-emerald-700 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Prêt à transformer votre cantine ?
          </h2>
          <p className="text-xl mb-8 text-green-50">
            Rejoignez les dizaines d'établissements qui font confiance au local
          </p>
          <button
            onClick={() => navigate("/register")}
            className="bg-white text-green-600 px-10 py-5 rounded-lg font-bold text-xl hover:bg-yellow-100 transition-all shadow-2xl hover:shadow-3xl transform hover:scale-105"
          >
            🚀 Commencer maintenant
          </button>
        </div>
      </section>
    </div>
  );
}

export default Home;

// src/pages/Products.tsx
import { useState, useEffect, useRef } from "react";
import { productAPI } from "../api";
import type { Product } from "../Types/product";
import ProductCard from "../components/ProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState("Entrées");
  const [isBio, setIsBio] = useState(false);
  const [availability, setAvailability] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const tabsRef = useRef<HTMLDivElement>(null);

  const scrollTabs = (direction: "left" | "right") => {
    if (tabsRef.current) {
        const scrollAmount = window.innerWidth < 640 ? 150 : 200; //pixels à défiler
      tabsRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    productAPI
      .getAll()
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Impossible de charger les produits");
        setLoading(false);
        console.error("Erreur lors de la récupération des produits :", err);
      });
  }, []);

  useEffect(() => {
    if (products.length === 0) return;
    const filtered = products
      .filter((p) => p.category?.name === activeTab)
      .filter((p) => (isBio ? p.isBio === true : true))
      .filter((p) => (availability ? p.availability === true : true));
    setFilteredProducts(filtered);
  }, [products, activeTab, isBio, availability]);

  if (loading)
    return <div className="loading text-center p-8">Chargement...</div>;
  if (error)
    return <div className="error text-center p-8 text-red-600">{error}</div>;


  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Container avec flèches  */}
        <div className="relative flex items-center gap-2 mb-8 mt-8">
          {/* Flèche gauche */}
          <button
            onClick={() => scrollTabs("left")}
            className="p-2 bg-white rounded-full shadow hover:bg-gray-50 flex-shrink-0"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Zone scrollable des onglets */}
          <div
            ref={tabsRef}
            className="flex gap-2 overflow-x-auto scroll-smooth border-b border-gray-200 flex-1 hide-scrollbar"
          >
            <button
              onClick={() => setActiveTab("Entrées")}
              className={`px-4 py-3 font-medium transition-all relative whitespace-nowrap ${activeTab === "Entrées"
                  ? "text-gray-900"
                  : "text-gray-500 hover:text-gray-700"
                }`}
            >
              🥗 Entrées
              {activeTab === "Entrées" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" />
              )}
            </button>

            <button
              onClick={() => setActiveTab("Légumes")}
              className={`px-4 py-3 font-medium transition-all relative whitespace-nowrap ${activeTab === "Légumes"
                  ? "text-gray-900"
                  : "text-gray-500 hover:text-gray-700"
                }`}
            >
              🥕 Légumes
              {activeTab === "Légumes" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" />
              )}
            </button>

            <button
              onClick={() => setActiveTab("Viandes")}
              className={`px-4 py-3 font-medium transition-all relative whitespace-nowrap ${activeTab === "Viandes"
                  ? "text-gray-900"
                  : "text-gray-500 hover:text-gray-700"
                }`}
            >
              🍖 Viandes
              {activeTab === "Viandes" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" />
              )}
            </button>

            <button
              onClick={() => setActiveTab("Produits laitiers")}
              className={`px-4 py-3 font-medium transition-all relative whitespace-nowrap ${activeTab === "Produits laitiers"
                  ? "text-gray-900"
                  : "text-gray-500 hover:text-gray-700"
                }`}
            >
              🧀 Produits laitiers
              {activeTab === "Produits laitiers" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" />
              )}
            </button>

            <button
              onClick={() => setActiveTab("Fruits")}
              className={`px-4 py-3 font-medium transition-all relative whitespace-nowrap ${activeTab === "Fruits"
                  ? "text-gray-900"
                  : "text-gray-500 hover:text-gray-700"
                }`}
            >
              🍎 Fruits
              {activeTab === "Fruits" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" />
              )}
            </button>

            <button
              onClick={() => setActiveTab("Féculents")}
              className={`px-4 py-3 font-medium transition-all relative whitespace-nowrap ${activeTab === "Féculents"
                  ? "text-gray-900"
                  : "text-gray-500 hover:text-gray-700"
                }`}
            >
              🍝 Féculents
              {activeTab === "Féculents" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" />
              )}
            </button>

            <button
              onClick={() => setActiveTab("Épicerie")}
              className={`px-4 py-3 font-medium transition-all relative whitespace-nowrap ${activeTab === "Épicerie"
                  ? "text-gray-900"
                  : "text-gray-500 hover:text-gray-700"
                }`}
            >
              🛒 Épicerie
              {activeTab === "Épicerie" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" />
              )}
            </button>
          </div>
          {/* Flèche droite */}
          <button
            onClick={() => scrollTabs("right")}
            className="p-2 bg-white rounded-full shadow hover:bg-gray-50 flex-shrink-0"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>


        {/* Options (checkboxes) */}
        <div className="flex gap-6 justify-center mb-6">
          <label className="flex items-center gap-2 text-gray-700 hover:text-gray-900 cursor-pointer transition-colors">
            <input
              type="checkbox"
              checked={isBio}
              onChange={(e) => setIsBio(e.target.checked)}
              className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-2 focus:ring-gray-900 cursor-pointer"
            />
            <span className="text-sm font-medium">
              🌱 Produits bio uniquement
            </span>
          </label>

          <label className="flex items-center gap-2 text-gray-700 hover:text-gray-900 cursor-pointer transition-colors">
            <input
              type="checkbox"
              checked={availability}
              onChange={(e) => setAvailability(e.target.checked)}
              className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-2 focus:ring-gray-900 cursor-pointer"
            />
            <span className="text-sm font-medium">✓ En stock uniquement</span>
          </label>
        </div>

        {/* GRILLE DE PRODUITS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.length === 0 ? (
            <div className="col-span-full text-center py-16">
              <p className="text-gray-500 text-lg">
                Aucun produit disponible dans cette catégorie
              </p>
            </div>
          ) : (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

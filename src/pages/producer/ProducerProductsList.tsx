import { productAPI } from "../../api";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Product } from "../../Types/product";
import { ASSETS_BASE_URL } from "../../api";

export default function ProducerProductsList() {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    productAPI.getMine().then(setProducts);
  }, []);

  const handleDelete = (id: number) => {
    // À implémenter plus tard
    console.log("Supprimer", id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header avec bouton */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-semibold text-gray-900">Mes Produits</h1>

        {products.length >= 1 && (
          <button
            onClick={() => navigate("/producer/products/create")}
            className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors duration-200"
          >
            <span className="text-lg">+</span>
            Ajouter un produit
          </button>
        )}
      </div>

      {/* Grille de produits */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => {
          const imagePath =
            product.imageProduct ||
            (product as any).image_Product ||
            "/images/default.jpg";
          const imageUrl = imagePath.startsWith("/")
            ? `${ASSETS_BASE_URL}${imagePath}`
            : imagePath;
          console.log("Product:", product.name);
          console.log("imagePath:", imagePath);
          console.log("imageUrl:", imageUrl);
          console.log("ASSETS_BASE_URL:", ASSETS_BASE_URL);
          console.log("---");

          return (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 overflow-hidden"
            >
              {/* Image du produit */}
              <div className="h-48 bg-gray-50 overflow-hidden">
                <img
                  src={imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Contenu */}
              <div className="p-5">
                {/* Nom et prix */}
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 flex-1">
                    {product.name}
                  </h3>
                  <span className="text-lg font-bold text-gray-900 ml-2">
                    {product.price}€
                  </span>
                  <span className="text-xs text-gray-500">
                    / {product.unit?.name ?? "unité"}
                  </span>
                </div>

                {/* Description courte */}
                {product.description_Product && (
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {product.description_Product}
                  </p>
                )}

                {/* Badges */}
                <div className="flex gap-2 mb-4">
                  {product.isBio && (
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                      Bio
                    </span>
                  )}
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      product.availability
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {product.availability ? "Disponible" : "Indisponible"}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      navigate(`/producer/products/edit/${product.id}`)
                    }
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    <span>✏️</span>
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors duration-200"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Message si aucun produit */}
      {products.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg mb-4">
            Vous n'avez pas encore de produits
          </p>
          <button
            onClick={() => navigate("/producer/products/create")}
            className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors duration-200"
          >
            Créer votre premier produit
          </button>
        </div>
      )}
    </div>
  );
}

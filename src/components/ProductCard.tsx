// src/components/ProductCard.tsx
import type { Product } from "../Types/product";
import { ASSETS_BASE_URL } from "../api";
import { useState } from "react";
import { addItem } from "../store/cartSlice";
import { useAppDispatch } from "../store/hooks";

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useAppDispatch();
  const imagePath =
    product.imageProduct ||
    (product as any).image_Product ||
    "/images/default.jpg";

  const imageUrl = imagePath.startsWith("/")
    ? `${ASSETS_BASE_URL}${imagePath}`
    : imagePath;

  return (
    <div className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
      {/* Image avec overlay au hover - Plus petite */}
      <div className="relative h-40 bg-gray-50 overflow-hidden">
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
      </div>

      {/* Contenu - Plus compact */}
      <div className="p-4">
        {/* Header : Nom + Badge Bio */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-base font-semibold text-gray-900 leading-tight flex-1">
            {product.name}
          </h3>
          {product.isBio && (
            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium whitespace-nowrap">
              🌱 Bio
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-2 leading-relaxed">
          {product.description_Product}
        </p>

        {/* Prix */}
        <div className="mb-3">
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold text-gray-900">
              {product.price}€
            </span>
            <span className="text-xs text-gray-500">
              / {product.unit?.name ?? "unité"}
            </span>
          </div>
        </div>

        {/* Statut disponibilité */}
        {!product.availability && (
          <div className="mb-3 px-2 py-1.5 bg-red-50 border border-red-200 rounded-lg">
            <span className="text-xs text-red-600 font-medium">
              ❌ Rupture de stock
            </span>
          </div>
        )}

        {/* Producteur */}
        <div className="pt-3 border-t border-gray-100">
          <p className="text-xs text-gray-500">
            👨‍🌾 {product.seller?.name ?? "Producteur"}
          </p>
        </div>

        {/* Input + Bouton Ajouter (seulement si disponible) */}
        {product.availability && (
          <div className="flex items-center gap-2 mt-3">
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-16 px-2 py-1 border border-gray-300 rounded text-center text-sm"
            />
            <span className="text-xs text-gray-600">{product.unit?.name}</span>
            <button
              onClick={() => {
                dispatch(
                  addItem({
                    productId: product.id,
                    quantity: quantity,
                  })
                );
                console.log('Produit ajouté:', product.id, 'quantité:', quantity);
                setQuantity(1);
              }}
              className="flex-1 px-3 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              🛒 Ajouter
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductCard;

// src/components/ProductCard.tsx
import type { Product } from '../Types/product';
import { ASSETS_BASE_URL } from "../api";

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const imagePath = product.imageProduct || (product as any).image_Product || '/images/default.jpg';
  const imageUrl = imagePath.startsWith('/')
    ? `${ASSETS_BASE_URL}${imagePath}`
    : imagePath;

  return (
    <div className="product-card border-2 border-green-200 rounded-lg shadow-md hover:shadow-xl transition-all p-4 max-w-xs bg-white hover:scale-105">
      <img
        src={imageUrl}
        alt={product.name}
        className="w-full h-48 object-cover rounded-md mb-3"
      />
      
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
        {product.isBio && (
          <span className="badge-bio bg-green-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
            🌱 BIO
          </span>
        )}
      </div>
      
      <p className="description text-gray-600 text-sm mb-3 line-clamp-2">
        {product.descriptionProduct}
      </p>
      
      <div className="price-section border-t border-green-100 pt-3">
        <p className="price text-2xl font-bold text-green-600 mb-3">
          {product.price}€<span className="text-sm text-gray-500">/{product.unit?.name ?? "unité"}</span>
        </p>
        
        {product.availability ? (
          <button className="btn-add-cart w-full px-4 py-2 bg-gradient-to-r from-amber-400 to-orange-500 text-white font-semibold rounded-lg hover:from-amber-500 hover:to-orange-600 transition-all shadow-md hover:shadow-lg">
            🛒 Ajouter au panier
          </button>
        ) : (
          <span className="unavailable block text-center bg-red-100 text-red-600 py-2 rounded-lg font-semibold">
            ❌ Rupture de stock
          </span>
        )}
      </div>
      
      <p className="producer text-sm text-gray-500 mt-3 italic">
        👨‍🌾 Par {product.seller?.name ?? "Producteur"}
      </p>
    </div>
  );
}
export default ProductCard;
import type { Product } from "../Types/product";
import { ASSETS_BASE_URL } from "../api";
import { useAppDispatch } from "../store/hooks";
import { removeItem, updateQuantity } from "../store/cartSlice";

interface CartItemProps {
  product: Product;
  quantity: number;
}

function CartItem({ product, quantity }: CartItemProps) {
  const lineTotal = product.price * quantity;
  const dispatch = useAppDispatch();

  const imagePath =
    product.imageProduct ||
    (product as any).image_Product ||
    "/images/default.jpg";

  const imageUrl = imagePath.startsWith("/")
    ? `${ASSETS_BASE_URL}${imagePath}`
    : imagePath;

  return (
    <div className="border p-4 mb-4 rounded-lg flex gap-4">
      {/* Image à gauche */}
      <div className="relative w-32 h-32 bg-gray-50 overflow-hidden rounded flex-shrink-0">
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Contenu principal */}
      <div className="flex-1 flex flex-col justify-between">
        {/* En-tête : Nom + Badge Bio */}
        <div>
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="text-lg font-semibold text-gray-900">
              {product.name}
            </h3>
            {product.isBio && (
              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                🌱 Bio
              </span>
            )}
          </div>

          {/* Prix unitaire */}
          <p className="text-sm text-gray-600 mb-2">
            {product.price}€ / {product.unit?.name ?? "unité"}
          </p>

          {/* Producteur */}
          <p className="text-xs text-gray-500">
            👨‍🌾 {product.seller?.name ?? "Producteur"}
          </p>
        </div>

        {/* Bas : Quantité + Total + Supprimer */}
        <div className="flex items-center justify-between mt-4">
          {/* Boutons quantité */}
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                dispatch(
                  updateQuantity({
                    productId: product.id,
                    quantity: quantity - 1,
                  })
                )
              }
              disabled={quantity <= 1}
              className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              −
            </button>

            <span className="font-medium w-8 text-center">{quantity}</span>

            <button
              onClick={() =>
                dispatch(
                  updateQuantity({
                    productId: product.id,
                    quantity: quantity + 1,
                  })
                )
              }
              className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
            >
              +
            </button>
          </div>

          {/* Total + Supprimer */}
          <div className="flex items-center gap-4">
            <p className="font-semibold text-lg">{lineTotal.toFixed(2)}€</p>

            <button
              onClick={() => dispatch(removeItem(product.id))}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              🗑️
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useEffect } from "react";
import { fetchProducts } from "../store/productsSlice";
import { removeItem, updateQuantity } from "../store/cartSlice";

const Cart = () => {
  const cartItems = useAppSelector((state) => state.cart.items);
  const allProducts = useAppSelector((state) => state.product.products);

  const dispatch = useAppDispatch();
  const totalGeneral = cartItems.reduce((sum, cartItem) => {
    const product = allProducts.find((p) => p.id === cartItem.productId);
    if (!product) return sum;
    return sum + product.price * cartItem.quantity;
  }, 0);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Mon Panier</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500 mb-4">Votre panier est vide</p>
          <p className="text-gray-400">
            Ajoutez des produits pour commencer votre commande
          </p>
        </div>
      ) : (
        <>
          {cartItems.map((cartItem) => {
            const product = allProducts.find(
              (p) => p.id === cartItem.productId
            );
            if (!product) return null;
            const lineTotal = product.price * cartItem.quantity;

            return (
              <div
                key={cartItem.productId}
                className="border p-4 mb-4 flex justify-between items-center gap-4"
              >
                {/* Informations produit - GAUCHE */}
                <div className="flex-1">
                  <p className="font-semibold">{product.name}</p>
                  <p className="text-sm text-gray-600">
                    {product.price}€ l'unité
                  </p>
                </div>

                {/* Gestion quantité - CENTRE */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      dispatch(
                        updateQuantity({
                          productId: cartItem.productId,
                          quantity: cartItem.quantity - 1,
                        })
                      )
                    }
                    disabled={cartItem.quantity <= 1}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                  >
                    −
                  </button>

                  <span className="font-medium w-8 text-center">
                    {cartItem.quantity}
                  </span>

                  <button
                    onClick={() =>
                      dispatch(
                        updateQuantity({
                          productId: cartItem.productId,
                          quantity: cartItem.quantity + 1,
                        })
                      )
                    }
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>

                {/* Total ligne + Supprimer - DROITE */}
                <div className="flex items-center gap-4">
                  <p className="font-semibold text-lg">
                    {lineTotal.toFixed(2)}€
                  </p>

                  <button
                    onClick={() => dispatch(removeItem(cartItem.productId))}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            );
          })}

          <div className="border-t pt-4 mt-6">
            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>
              <span>{totalGeneral.toFixed(2)}€</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default Cart;

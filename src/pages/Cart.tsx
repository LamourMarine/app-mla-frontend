import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useEffect, useState } from "react";
import { fetchProducts } from "../store/productsSlice";
import { useNavigate } from "react-router-dom";
import CartItem from "../components/CartItem";
import { orderAPI } from "../api";
import { clearCart } from "../store/cartSlice";
import toast from "react-hot-toast";

const Cart = () => {
  const cartItems = useAppSelector((state) => state.cart.items);
  const allProducts = useAppSelector((state) => state.product.products);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const totalGeneral = cartItems.reduce((sum, cartItem) => {
    const product = allProducts.find((p) => p.id === cartItem.productId);
    if (!product) return sum;
    return sum + product.price * cartItem.quantity;
  }, 0);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleValidateOrder = async () => {
    setIsSubmitting(true);

    try {
      // Préparer les données pour l'API
      const orderData = {
        items: cartItems.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
      };

      // Envoyer la commande
      const response = await orderAPI.create(orderData);

      dispatch(clearCart());

      toast.success("Commande validée avec succès !", {
        duration: 3000,
      });

      navigate("/order-confirmation", {
        state: { order: response.order },
      });
    } catch (error: any) {
      console.error("Erreur lors de la création de la commande:", error);

      const errorMessage =
        error.response?.data?.message ||
        "Erreur lors de la création de la commande";
      toast.error(errorMessage, {
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Mon Panier</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500 mb-4">Votre panier est vide</p>
          <p className="text-gray-400 mb-6">
            Ajoutez des produits pour commencer votre commande
          </p>
          <button
            onClick={() => navigate("/products")}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Découvrir nos produits
          </button>
        </div>
      ) : (
        <>
          {cartItems.map((cartItem) => {
            const product = allProducts.find(
              (p) => p.id === cartItem.productId
            );
            if (!product) return null;

            return (
              <CartItem
                key={cartItem.productId}
                product={product}
                quantity={cartItem.quantity}
              />
            );
          })}

          <div className="border-t pt-4 mt-6">
            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>
              <span>{totalGeneral.toFixed(2)}€</span>
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              onClick={() => navigate("/products")}
              className="flex-1 px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Continuer mes achats
            </button>
            <button
              onClick={handleValidateOrder}
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Validation en cours..." : "Valider la commande"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;

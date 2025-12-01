import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface OrderData {
    id: number;
    number: string;
    total: string;
    orderAt: string;
    itemsCount: number;
}

const OrderConfirmation = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [orderData, setOrderData] = useState<OrderData | null>(null);

    useEffect(() => {
        // Recuperer les données de la commande passées via la navigation
        if(location.state?.order) {
            setOrderData(location.state.order);
        } else {
            // Si pas de données, rediriger vers l'accueil
            navigate("/");
        }
    }, [location, navigate]);

    if (!orderData) {
        return null;
    }

    return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12">
      <div className="max-w-2xl mx-auto px-4">
        {/* Icône de succès */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500 rounded-full mb-4">
            <span className="text-4xl text-white">✓</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Commande confirmée !
          </h1>
          <p className="text-gray-600">
            Merci pour votre commande. Nous la préparons avec soin.
          </p>
        </div>

        {/* Détails de la commande */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <h2 className="text-xl font-semibold mb-6 pb-4 border-b">
            Récapitulatif de votre commande
          </h2>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Numéro de commande</span>
              <span className="font-semibold text-gray-900">
                {orderData.number}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Date</span>
              <span className="font-semibold text-gray-900">
                {new Date(orderData.orderAt).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Nombre d'articles</span>
              <span className="font-semibold text-gray-900">
                {orderData.itemsCount}
              </span>
            </div>

            <div className="flex justify-between pt-4 border-t text-lg">
              <span className="font-semibold text-gray-900">Total</span>
              <span className="font-bold text-green-600">
                {parseFloat(orderData.total).toFixed(2)} €
              </span>
            </div>
          </div>
        </div>

        {/* Informations complémentaires */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <h3 className="font-semibold text-blue-900 mb-2">
            📧 Et maintenant ?
          </h3>
          <p className="text-blue-800 text-sm">
            Vous allez recevoir un email de confirmation à l'adresse associée à
            votre compte. Les producteurs vont préparer votre commande et vous
            serez informé dès qu'elle sera prête.
          </p>
        </div>

        {/* Boutons d'action */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => navigate("/products")}
            className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            Continuer mes achats
          </button>
          <button
            onClick={() => navigate("/")}
            className="flex-1 px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium"
          >
            Retour à l'accueil
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;



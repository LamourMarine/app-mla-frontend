import { useState, useEffect } from "react";
import { producerAPI } from "../api";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchProducers, setDeactivatedProducers, deactivateProducer, reactivateProducer } from "../store/producerSlice";


function AdminDashboard() {
  const activeProducers = useAppSelector((state) => state.producer.producers);
  const deactivatedProducers = useAppSelector(
    (state) => state.producer.deactivatedProducers
  );
  const [showDeactivated, setShowDeactivated] = useState(false);
  const dispatch = useAppDispatch(); // Charge les producteurs actifs



  useEffect(() => {
    dispatch(fetchProducers()); // thunk qui remplit le state global
  }, [dispatch]);

  // Charge les producteurs désactivés
  const loadDeactivated = async () => {
    const { data } = await producerAPI.getDeactivated();
    dispatch(setDeactivatedProducers(Array.isArray(data) ? data : []));
    setShowDeactivated(true);
  };

  // Désactive un producteur
  const handleDeactivate = async (id: number) => {
    if (!confirm("Désactiver ce producteur ?")) return;

    try {
      await producerAPI.deactivate(id);
      dispatch(deactivateProducer(id));
    } catch (error) {
      alert("Erreur");
    }
  };

  // Réactive un producteur
  const handleActivate = async (id: number) => {
    if (!confirm("Voulez-vous réactiver ce producteur ?")) return;

    const producerToActivate = deactivatedProducers.find(p => p.id === id);
  if (!producerToActivate) return;

    try {
      await producerAPI.activate(id);
      dispatch(reactivateProducer(id));
    } catch (error) {
      alert("Erreur");
    }
  };
      
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard Admin</h1>

      {/* Onglets */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setShowDeactivated(false)}
          className={`px-4 py-2 rounded ${
            !showDeactivated ? "bg-gray-900 text-white" : "bg-gray-200"
          }`}
        >
          Producteurs actifs ({activeProducers?.length ?? 0})
        </button>
        <button
          onClick={loadDeactivated}
          className={`px-4 py-2 rounded ${
            showDeactivated ? "bg-gray-900 text-white" : "bg-gray-200"
          }`}
        >
          Producteurs désactivés ({deactivatedProducers.length})
        </button>
      </div>

      {/* Liste des producteurs actifs */}
      {!showDeactivated && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Producteurs actifs</h2>
          {activeProducers?.map((producer) => (
            <div
              key={producer.id}
              className="flex items-center justify-between p-4 bg-white rounded shadow"
            >
              <div>
                <h3 className="font-semibold">{producer.name}</h3>
                <p className="text-sm text-gray-600">{producer.email}</p>
              </div>
              <button
                onClick={() => handleDeactivate(producer.id)}
                className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
              >
                Désactiver
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Liste des producteurs désactivés */}
      {showDeactivated && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Producteurs désactivés</h2>
          {deactivatedProducers.length === 0 ? (
            <p className="text-gray-500">Aucun producteur désactivé</p>
          ) : (
            deactivatedProducers.map((producer) => (
              <div
                key={producer.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded shadow"
              >
                <div>
                  <h3 className="font-semibold text-gray-700">
                    {producer.name}
                  </h3>
                  <p className="text-sm text-gray-500">{producer.email}</p>
                </div>
                <button
                  onClick={() => handleActivate(producer.id)}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Réactiver
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;

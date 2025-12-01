import { useState, useEffect } from "react";
import { producerAPI } from "../api";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { 
  fetchProducers, 
  setDeactivatedProducers, 
  deactivateProducer, 
  reactivateProducer,
  setPendingProducers,
  approveProducer,
  rejectProducer
} from "../store/producerSlice";
import toast from 'react-hot-toast';


function AdminDashboard() {
  const activeProducers = useAppSelector((state) => state.producer.producers);
  const deactivatedProducers = useAppSelector(
    (state) => state.producer.deactivatedProducers
  );
  const pendingProducers = useAppSelector(
    (state) => state.producer.pendingProducers
  );
  
  const [currentTab, setCurrentTab] = useState<'active' | 'deactivated' | 'pending'>('active');
  const dispatch = useAppDispatch();

useEffect(() => {
    dispatch(fetchProducers()); // Charge les producteurs actifs
    
    // Charge aussi les producteurs en attente
    const loadPending = async () => {
      try {
        const { data } = await producerAPI.getPending();
        dispatch(setPendingProducers(data.producers || []));
      } catch (error) {
        console.error("Erreur chargement pending:", error);
      }
    };
    
    loadPending();
  }, [dispatch]);
  // Charge les producteurs désactivés
  const loadDeactivated = async () => {
    const { data } = await producerAPI.getDeactivated();
    dispatch(setDeactivatedProducers(Array.isArray(data) ? data : []));
    setCurrentTab('deactivated');
  };

  // Charge les producteurs en attente
  const loadPending = async () => {
    const { data } = await producerAPI.getPending();
    dispatch(setPendingProducers(data.producers || []));
    setCurrentTab('pending');
  };

  // Désactive un producteur
  const handleDeactivate = async (id: number) => {
    if (!confirm("Désactiver ce producteur ?")) return;

    try {
      await producerAPI.deactivate(id);
      dispatch(deactivateProducer(id));
      toast.success("Producteur désactivé");
    } catch (error) {
      toast.error("Erreur lors de la désactivation");
    }
  };

  // Réactive un producteur
  const handleActivate = async (id: number) => {
    if (!confirm("Voulez-vous réactiver ce producteur ?")) return;

    try {
      await producerAPI.activate(id);
      dispatch(reactivateProducer(id));
      toast.success("Producteur réactivé");
    } catch (error) {
      toast.error("Erreur lors de la réactivation");
    }
  };

  // Approuver un producteur
  const handleApprove = async (id: number) => {
    if (!confirm("Approuver ce producteur ?")) return;

    try {
      await producerAPI.approve(id);
      dispatch(approveProducer(id));
      toast.success("Producteur approuvé avec succès !");
    } catch (error) {
      toast.error("Erreur lors de l'approbation");
    }
  };

  // Rejeter un producteur
  const handleReject = async (id: number) => {
    if (!confirm("Rejeter ce producteur ? Cette action est définitive.")) return;

    try {
      await producerAPI.reject(id);
      dispatch(rejectProducer(id));
      toast.success("Producteur rejeté");
    } catch (error) {
      toast.error("Erreur lors du rejet");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard Admin</h1>

      {/* Onglets */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setCurrentTab('active')}
          className={`px-4 py-2 rounded ${
            currentTab === 'active' ? "bg-gray-900 text-white" : "bg-gray-200"
          }`}
        >
          Producteurs actifs ({activeProducers?.length ?? 0})
        </button>
        
        <button
          onClick={loadPending}
          className={`px-4 py-2 rounded ${
            currentTab === 'pending' ? "bg-amber-600 text-white" : "bg-amber-100"
          }`}
        >
          En attente de validation ({pendingProducers.length})
        </button>
        
        <button
          onClick={loadDeactivated}
          className={`px-4 py-2 rounded ${
            currentTab === 'deactivated' ? "bg-gray-900 text-white" : "bg-gray-200"
          }`}
        >
          Producteurs désactivés ({deactivatedProducers.length})
        </button>
      </div>

      {/* Liste des producteurs actifs */}
      {currentTab === 'active' && (
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

      {/* Liste des producteurs en attente */}
      {currentTab === 'pending' && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Producteurs en attente de validation</h2>
          {pendingProducers.length === 0 ? (
            <p className="text-gray-500">Aucun producteur en attente</p>
          ) : (
            pendingProducers.map((producer) => (
              <div
                key={producer.id}
                className="flex items-center justify-between p-4 bg-amber-50 rounded shadow border-l-4 border-amber-500"
              >
                <div>
                  <h3 className="font-semibold">{producer.name}</h3>
                  <p className="text-sm text-gray-600">{producer.email}</p>
                  {producer.address && (
                    <p className="text-sm text-gray-500">{producer.address}</p>
                  )}
                  {producer.phoneNumber && (
                    <p className="text-sm text-gray-500">{producer.phoneNumber}</p>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleApprove(producer.id)}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    ✓ Approuver
                  </button>
                  <button
                    onClick={() => handleReject(producer.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    ✗ Rejeter
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Liste des producteurs désactivés */}
      {currentTab === 'deactivated' && (
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
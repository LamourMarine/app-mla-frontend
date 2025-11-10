import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { producerAPI } from "../api";

type Producer = {
  id: number;
  name: string;
  email: string;
};

export function AdminDashboard() {
  const { isAdmin } = useContext(AuthContext);
  const [producers, setProducers] = useState<Producer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducers = async () => {
      try {
        const data = await producerAPI.getAll();
        setProducers(data);
      } catch (error) {
        console.error("Erreur lors du chargement des producteurs :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducers();
  }, []);

  const handleDelete = async (producerId: number) => {
    if (!confirm("Supprimer ce producteur ?")) return;

    try {
      await producerAPI.delete(producerId);
      alert("Producteur supprimé");
      // Met à jour la liste localement
      setProducers((prev) => prev.filter((p) => p.id !== producerId));
    } catch (error: any) {
      if (error.response?.status === 403) {
        alert("Erreur : vous n'avez pas les droits");
      } else {
        alert("Erreur lors de la suppression du producteur");
      }
    }
  };

  if (loading) return <p>Chargement des producteurs...</p>;

  return (
    <div>
      <h2>Tableau de bord administrateur</h2>

      {producers.length === 0 ? (
        <p>Aucun producteur trouvé.</p>
      ) : (
        producers.map((producer) => (
          <div key={producer.id}>
            <h3>{producer.name}</h3>
            <p>{producer.email}</p>

            {isAdmin && (
              <button onClick={() => handleDelete(producer.id)}>
                Supprimer
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
}

import { useState, useEffect } from "react";
import { productAPI } from "../api";
import type { Product } from "../Types/product";
import ProducersCarrousel from "../components/ProducersCarrousel";
import { producerAPI } from "../api";
import ProducerCard from "../components/ProducerCard";

interface Producer {
  id: number;
  name: string;
  photo: string | null;
  address: string;
  email: string;
}

function Producers() {
  const [producers, setProducers] = useState<Producer[]>([]);

  // Charge tous les producteurs au montage du composant
  useEffect(() => {
    producerAPI.getAll().then(setProducers);
  }, []);

  return (
    <div>
      <div className="w-full h-28">
        <h1 className="producers-title text-[#002A22]">
          Direct producteurs et artisans de la région
        </h1>
      </div>
      <div className="producers-page">
        {/* Affiche une section par producteur avec sa carte et ses produits */}
        {producers.map((producer) => (
          <ProducerSection key={producer.id} producer={producer} />
        ))}
      </div>
    </div>
  );
}

interface ProducerSectionProps {
  producer: Producer;
}

function ProducerSection({ producer }: ProducerSectionProps) {
  const [products, setProducts] = useState<Product[]>([]);
  
  // Détecte si on est sur mobile pour adapter le nombre de produits visibles
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Met à jour l'état mobile quand on redimensionne la fenêtre
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    // IMPORTANT: cleanup pour éviter les fuites mémoire
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 1 produit visible sur mobile, 4 sur desktop
  const visibleCount = isMobile ? 1 : 4;

  // Charge uniquement les produits de ce producteur
  useEffect(() => {
    productAPI.getAll().then((data) => {
      // Filtre pour ne garder que les produits vendus par ce producteur
      const producerProducts = data.filter((p) => p.seller?.id === producer.id);
      setProducts(producerProducts);
    });
  }, [producer.id]); // Se recharge si le producteur change

  return (
    <div className="bg-[#002A22] p-6 md:p-8 rounded-lg mb-6">
      <div className="flex flex-col md:flex-row gap-6 items-center md:items-stretch">
        {/* Carte Producteur */}
        <div className="w-full max-w-xs md:max-w-[300px] flex-shrink-0">
          <ProducerCard producer={producer} />
        </div>
        
        {/* Carrousel Produits */}
        <div className="w-full md:flex-1">
          {products.length > 0 ? (
            <ProducersCarrousel products={products} visibleCount={visibleCount} />
          ) : (
            <p className="text-white">Aucun produit disponible</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Producers;
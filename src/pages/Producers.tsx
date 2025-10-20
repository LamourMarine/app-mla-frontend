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

  useEffect(() => {
    // Récupérer les produits de ce producteur
    productAPI.getAll().then((data) => {
      console.log("✅ Tous les produits récupérés :", data);
      console.log("👤 Producteur courant :", producer);
      const producerProducts = data.filter((p) => p.seller?.id === producer.id);
      console.log("🎯 Produits trouvés :", producerProducts);

      setProducts(producerProducts);
    });
  }, [producer.id]);

  return (
    <div className="producer-section mb-12 mt-10">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
        <ProducerCard producer={producer} />

        {products.length > 0 ? (
          <ProducersCarrousel products={products} visibleCount={3} />
        ) : (
          <p>Aucun produit disponible</p>
        )}
      </div>
    </div>
  );
}
export default Producers;

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

  // Hook pour détecter mobile de manière réactive
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const visibleCount = isMobile ? 1 : 4;

  useEffect(() => {
    // Récupérer les produits de ce producteur
    productAPI.getAll().then((data) => {
      const producerProducts = data.filter((p) => p.seller?.id === producer.id);
      setProducts(producerProducts);
    });
  }, [producer.id]);

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

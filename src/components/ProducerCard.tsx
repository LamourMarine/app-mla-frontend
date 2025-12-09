// src/components/ProducerCard.tsx
import { ASSETS_BASE_URL } from "../api";
import { Mail, MapPin } from "lucide-react";
import type { Producer } from "../Types/producer";

interface ProducerCardProps {
  producer: Producer;
}

function ProducerCard({ producer }: ProducerCardProps) {
  const imagePath =
    producer.photo || (producer as any).photo || "/images/default.jpg";
  const imageUrl = imagePath.startsWith("/")
    ? `${ASSETS_BASE_URL}${imagePath}`
    : imagePath;

  return (
    <div className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
      {/* Image épurée */}
      <div className="relative h-56 overflow-hidden bg-gray-50">
        <img
          src={imageUrl}
          alt={producer.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
      </div>
      
      {/* Contenu sobre et espacé */}
      <div className="p-6">
        {/* Nom du producteur */}
        <h2 className="text-xl font-semibold text-gray-900 mb-4 tracking-tight">
          {producer.name}
        </h2>
        
        {/* Adresse avec icône discrète */}
        <div className="flex items-start gap-3 text-gray-600 text-sm mb-3">
          <MapPin size={16} className="mt-0.5 flex-shrink-0 text-gray-400" />
          <p className="line-clamp-2 leading-relaxed">{producer.address}</p>
        </div>
        
        {/* Email cliquable avec icône discrète */}
        <div className="flex items-center gap-3 text-gray-600 text-sm">
          <Mail size={16} className="flex-shrink-0 text-gray-400" />
          <a 
            href={`mailto:${producer.email}`}
            className="hover:text-gray-900 transition-colors duration-200 truncate"
          >
            {producer.email}
          </a>
        </div>
      </div>
    </div>
  );
}

export default ProducerCard;
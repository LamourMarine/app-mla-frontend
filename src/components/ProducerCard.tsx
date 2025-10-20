import { ASSETS_BASE_URL } from "../api";
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
    <div className="producer-card border-2 border-green-200 rounded-lg shadow-md hover:shadow-xl transition-all p-4 max-w-xs bg-white hover:scale-105">
      <img
        src={imageUrl}
        alt={producer.name}
        className="w-full h-48 object-cover rounded-md mb-3"
      />

        <h2 className="text-2xl font-bold mb-4 text-green-600">
          {producer.name}
        </h2>

      <p className="description text-gray-600 text-sm mb-3 line-clamp-2">
        {producer.address}
      </p>

      <p className="description text-gray-600 text-sm mb-3 line-clamp-2">
        {producer.email}
      </p>
    </div>
  );
}
export default ProducerCard;
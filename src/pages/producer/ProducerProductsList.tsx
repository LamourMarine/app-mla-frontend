import { productAPI } from "../../api";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Product } from "../../Types/product";

export default function ProducerProductsList() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    productAPI.getMine().then(setProducts);
  }, []);

  return (
    <div>
      <h1>Mes Produits</h1>

      <Link to="/producer/products/create">Ajouter un produit</Link>

      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.name} - {p.price} €
            <Link to={`/producer/products/edit/${p.id}`}>Modifier</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

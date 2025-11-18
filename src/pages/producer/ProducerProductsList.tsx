import { productAPI } from "../../api";
import {  useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Product } from "../../Types/product";

export default function ProducerProductsList() {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    productAPI.getMine().then(setProducts);
  }, []);
  
  const handleDelete = (id: number) => {
    // À implémenter plus tard
    console.log('Supprimer', id);
  };
  
  return (
    <div>
      <button onClick={() => navigate('/producer/products/create')}>
        + Ajouter un produit
      </button>
      
      {products.map(product => (
        <div key={product.id}> 
          <h3>{product.name}</h3>
          <button onClick={() => navigate(`/producer/products/edit/${product.id}`)}>
            ✏️ Modifier
          </button>
          <button onClick={() => handleDelete(product.id)}>
            🗑️ Supprimer
          </button>
        </div>
      ))}
    </div>
  );
}
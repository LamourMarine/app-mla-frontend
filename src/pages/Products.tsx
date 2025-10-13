// src/pages/Products.tsx
import { useState, useEffect } from 'react';
import { productAPI } from '../api';
import type { Product} from '../Types/product';

function Products() {
  //const [activeTab, setActiveTab] = useState('fruits');
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState('Fruits');


  useEffect(() => {
    productAPI.getAll().then((data) => {
      console.log("Produits chargés:", data);
      setProducts(data);
    });
  }, []);

  // 👇 FILTRER QUAND products OU activeTab CHANGE
  useEffect(() => {
    if (products.length === 0) return; // 👈 IMPORTANT : Attendre que les produits soient chargés

    console.log("Filtrage avec:", activeTab);
    console.log("Produits disponibles:", products);
    
    const filtered = products.filter((p) => {
      console.log(`Produit: ${p.name}, Catégorie: ${p.category?.name}`);
      return p.category?.name === activeTab;
    });
    
    console.log("Résultat filtré:", filtered);
    setFilteredProducts(filtered);
  }, [products, activeTab]);
  return (
    <div>
      {/* TABS */}
      <div className="tabs">
        <button 
          onClick={() => setActiveTab('Fruits')}
          className={activeTab === 'fruits' ? 'active' : ''}
        >
          Fruits
        </button>
        <button 
          onClick={() => setActiveTab('Légumes')}
          className={activeTab === 'légumes' ? 'active' : ''}
        >
          Légumes
        </button>
        <button 
          onClick={() => setActiveTab('Produits laitiers')}
          className={activeTab === 'produits laitiers' ? 'active' : ''}
        >
          Produits laitiers
        </button>
      </div>

      {/* LISTE DES PRODUITS */}
      <div className="product-grid">
        {filteredProducts.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.imageProduct} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.price}€/{product.unit.id}-{product.unit?.name??"Non définie"}</p>
            <button>Ajouter au panier</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;

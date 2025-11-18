// src/pages/Products.tsx
import { useState, useEffect } from 'react';
import { productAPI } from '../api';
import type { Product } from '../Types/product';
import ProductCard from '../components/ProductCard';

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState('Fruits');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    productAPI.getAll()
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Impossible de charger les produits");
        setLoading(false);
        console.error("Erreur lors de la récupération des produits :", err);
      });
  }, []);

  useEffect(() => {
    if (products.length === 0) return;
    const filtered = products.filter((p) => p.category?.name === activeTab);
    setFilteredProducts(filtered);
  }, [products, activeTab]);

  if (loading) return <div className="loading text-center p-8">Chargement...</div>;
  if (error) return <div className="error text-center p-8 text-red-600">{error}</div>;

  return (
    <div className="products-page max-w-7xl mx-auto px-4 py-8">
      {/* TABS épurés */}
      <div className="flex gap-2 mb-8 mt-8 justify-center border-b border-gray-200">
        <button
          onClick={() => setActiveTab('Fruits')}
          className={`px-6 py-3 font-medium transition-all relative ${
            activeTab === 'Fruits' 
              ? 'text-gray-900' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          🍎 Fruits
          {activeTab === 'Fruits' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" />
          )}
        </button>
        
        <button
          onClick={() => setActiveTab('Légumes')}
          className={`px-6 py-3 font-medium transition-all relative ${
            activeTab === 'Légumes' 
              ? 'text-gray-900' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          🥕 Légumes
          {activeTab === 'Légumes' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" />
          )}
        </button>
        
        <button
          onClick={() => setActiveTab('Produits laitiers')}
          className={`px-6 py-3 font-medium transition-all relative ${
            activeTab === 'Produits laitiers' 
              ? 'text-gray-900' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          🧀 Produits laitiers
          {activeTab === 'Produits laitiers' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" />
          )}
        </button>
      </div>
      
      {/* GRILLE DE PRODUITS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.length === 0 ? (
          <div className="col-span-full text-center py-16">
            <p className="text-gray-500 text-lg">
              Aucun produit disponible dans cette catégorie
            </p>
          </div>
        ) : (
          filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
    </div>
  );
}
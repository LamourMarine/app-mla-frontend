// src/pages/Products.tsx
// import { useState, useEffect } from 'react';
// import { productAPI } from '../api';
// import type { Product } from '../Types/product';
// import ProductCard from '../components/ProductCard';

// function Products() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
//   const [activeTab, setActiveTab] = useState('Fruits');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     productAPI.getAll()
//       .then((data) => {
//         setProducts(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         setError("Impossible de charger les produits");
//         setLoading(false);
//         console.error("Erreur lors de la récupération des produits :", err);
//       });
//   }, []);

//   useEffect(() => {
//     if (products.length === 0) return;
//     const filtered = products.filter((p) => p.category?.name === activeTab);
//     setFilteredProducts(filtered);
//   }, [products, activeTab]);

//   if (loading) return <div className="loading text-center p-8">Chargement...</div>;
//   if (error) return <div className="error text-center p-8 text-red-600">{error}</div>;

//   return (
//     <div className="products-page flex flex-col items-center w-full px-4 py-8">
//       {/* TABS */}
//       <div className="tabs flex gap-4 mb-8 mt-8 flex-wrap justify-center">
//         <button
//           onClick={() => setActiveTab('Fruits')}
//           className={`px-6 py-2 rounded-lg transition-all font-semibold ${
//             activeTab === 'Fruits' 
//               ? 'bg-gradient-to-r from-orange-400 to-red-400 text-white shadow-lg transform scale-105' 
//               : 'bg-orange-100 text-orange-700 hover:bg-orange-200'
//           }`}
//         >
//           🍎 Fruits
//         </button>
//         <button
//           onClick={() => setActiveTab('Légumes')}
//           className={`px-6 py-2 rounded-lg transition-all font-semibold ${
//             activeTab === 'Légumes' 
//               ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-lg transform scale-105' 
//               : 'bg-green-100 text-green-700 hover:bg-green-200'
//           }`}
//         >
//           🥕 Légumes
//         </button>
//         <button
//           onClick={() => setActiveTab('Produits laitiers')}
//           className={`px-6 py-2 rounded-lg transition-all font-semibold ${
//             activeTab === 'Produits laitiers' 
//               ? 'bg-gradient-to-r from-blue-400 to-indigo-400 text-white shadow-lg transform scale-105' 
//               : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
//           }`}
//         >
//           🧀 Produits laitiers
//         </button>
//       </div>

//       {/* GRILLE DE PRODUITS */}
//       <div className="product-grid flex flex-wrap gap-6 justify-center max-w-7xl">
//         {filteredProducts.length === 0 ? (
//           <p className="no-products text-gray-500 text-center w-full py-8">
//             Aucun produit disponible dans cette catégorie
//           </p>
//         ) : (
//           filteredProducts.map(product => (
//             <div 
//               key={product.id}
//               className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1rem)]"
//             >
//               <ProductCard product={product} />
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }

// export default Products;

function Products() {
  return <div>Test - page vide</div>;
}

export default Products;
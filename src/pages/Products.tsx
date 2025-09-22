import { useState } from "react";

const Products = () => {
  const [activeTab, setActiveTab] = useState("fruits");

  const products = {
    fruits: ["Pommes", "Poires", "Bananes"],
    legumes: ["Carottes", "Tomates", "Courgettes"],
    dairy: ["Lait", "Fromage", "Yaourt"],
  };

  return (
    <section>
      {/*Tabs*/}
      <div className="flex gap-4 border-b mb-6">
        <button
          onClick={() => setActiveTab("fruits")}
          className={
            activeTab === "fruits"
              ? "border-b-2 border-green-500 font-bold"
              : ""
          }
        >
          Fruits
        </button>
        <button
          onClick={() => setActiveTab("legumes")}
          className={
            activeTab === "legumes"
              ? "border-b-2 border-green-500 font-bold"
              : ""
          }
        >
          Légumes
        </button>
        <button
          onClick={() => setActiveTab("dairy")}
          className={
            activeTab === "dairy" ? "border-b-2 border-green-500 font-bold" : ""
          }
        >
          Produis Laitiers
        </button>
      </div>

      {/*Contenu dynamique*/}
      {activeTab === "fruits" && <p>Liste de fruits</p>}
      {activeTab === "legumes" && <p>Liste de légumes</p>}
      {activeTab === "dairy" && <p>Liste des produits laitiers</p>}
    </section>
  );
};

export default Products;

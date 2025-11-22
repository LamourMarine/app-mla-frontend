import { useState, useEffect } from "react";
import { categoryAPI, productAPI, unitAPI } from "../../api";
import { useNavigate } from "react-router-dom";
import type { ProductPayload } from "../../Types/product";
import type { Category } from "../../Types/category";
import { useAppDispatch } from "../../store/hooks";
import { addProduct } from "../../store/productsSlice";
import type { Unit } from "../../Types/unit";

export default function ProductCreatePage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [categories, setCategories] = useState<Category[]>([]);
  const [units, setUnits] = useState<Unit[]>([]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categories = await categoryAPI.getAll();
        console.log("Categories reçues:", categories);
        setCategories(categories);
      } catch (error) {
        console.error("Erreur:", error);
      }
    };

    loadCategories();
  }, []);

  useEffect(() => {
    const loadUnits = async () => {
      try {
        const units = await unitAPI.getAll();
        console.log("Unités reçues:", units);
        setUnits(units);
      } catch (error) {
        console.error('Erreur:', error);
      }
    };

    loadUnits();
  }, []);

  const [form, setForm] = useState<ProductPayload>({
    name: "",
    description_Product: "",
    image_Product: null,
    price: 0,
    categoryId: 1,
    unitId: 8,
    isBio: false,
    availability: true,
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    // Envoyer les données structurées en JSON
    const productData = {
      name: form.name,
      description_Product: form.description_Product,
      price: parseFloat(form.price.toString()), // Float
      categoryId: form.categoryId,
      unitId: form.unitId,
      isBio: form.isBio,
      availability: form.availability,
    };

    formData.append("data", JSON.stringify(productData)); // JSON avec les bons types

    // Ajouter l'image séparément
    if (form.image_Product && form.image_Product instanceof File) {
      console.log(
        "Ajout du fichier:",
        form.image_Product.name,
        form.image_Product.size
      );
      formData.append("image_Product", form.image_Product);
    } else {
      console.log("Pas de fichier valide");
    }
    console.log("=== DEBUG FormData ===");
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
    console.log("JSON data:", JSON.stringify(productData));
    console.log("======================");

    console.log("FormData créé avec image:", form.image_Product?.name);

    try {
      const newProduct = await productAPI.create(formData);
      dispatch(addProduct(newProduct));
      navigate("/producer/products");
    } catch (error) {
      console.error("Erreur complète:", error);
      alert("Erreur lors de la création");
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-900">
          Créer un produit
        </h1>
        <p className="text-gray-600 mt-2">
          Ajoutez un nouveau produit à votre catalogue
        </p>
      </div>

      {/* Formulaire */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-sm border border-gray-100 p-6"
      >
        {/* Nom du produit */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nom du produit *
          </label>
          <input
            type="text"
            placeholder="Ex: Tomates bio"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
          />
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description *
          </label>
          <textarea
            value={form.description_Product}
            onChange={(e) =>
              setForm({ ...form, description_Product: e.target.value })
            }
            placeholder="Décrivez votre produit..."
            required
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all resize-none"
          />
        </div>

        {/* Prix catégorie et unité sur la même ligne */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Prix */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Prix (€) *
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              value={form.price}
              onChange={(e) =>
                setForm({ ...form, price: Number(e.target.value) || 0 })
              }
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
            />
          </div>

          {/* Catégorie */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Catégorie *
            </label>
            <select
              value={form.categoryId || ""}
              onChange={(e) =>
                setForm({ ...form, categoryId: Number(e.target.value) })
              }
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all bg-white"
            >
              <option value="">Choisir une catégorie</option>
              {categories?.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Unité */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Unité *
            </label>
            <select
              value={form.unitId || ""}
              onChange={(e) =>
                setForm({ ...form, unitId: Number(e.target.value) })
              }
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all bg-white"
            >
              <option value="">Choisir une unité</option>
              {units?.map((unit) => (
                <option key={unit.id} value={unit.id}>
                  {unit.name}
                </option>
              ))}
            </select>
          </div>

        </div>

        

        {/* Image */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Image du produit
          </label>
          <input
            type="file"
            onChange={(e) => {
              const file = e.target.files?.[0];
              console.log("Fichier sélectionné:", file);
              if (file) {
                setForm({ ...form, image_Product: file });
              }
            }}
            accept="image/*"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 file:cursor-pointer"
          />
        </div>

        {/* Checkboxes */}
        <div className="mb-6 space-y-3">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={form.isBio}
              onChange={(e) => setForm({ ...form, isBio: e.target.checked })}
              className="w-5 h-5 rounded border-gray-300 text-gray-900 focus:ring-2 focus:ring-gray-900 cursor-pointer"
            />
            <span className="text-sm text-gray-700 group-hover:text-gray-900">
              🌱 Produit bio
            </span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={form.availability}
              onChange={(e) =>
                setForm({ ...form, availability: e.target.checked })
              }
              className="w-5 h-5 rounded border-gray-300 text-gray-900 focus:ring-2 focus:ring-gray-900 cursor-pointer"
            />
            <span className="text-sm text-gray-700 group-hover:text-gray-900">
              ✓ Produit disponible
            </span>
          </label>
        </div>

        {/* Boutons */}
        <div className="flex gap-4 pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={() => navigate("/producer/products")}
            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            Annuler
          </button>
          <button
            type="submit"
            className="flex-1 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors duration-200"
          >
            Créer le produit
          </button>
        </div>
      </form>
    </div>
  );
}

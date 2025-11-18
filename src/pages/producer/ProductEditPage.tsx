import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../api";
import type { ProductPayload } from "../../Types/product";
import { productAPI, categoryAPI } from "../../api";
import type { Category } from "../../Types/category";
import { useAppDispatch } from "../../store/hooks";
import { updateProduct } from "../../store/productsSlice";



export const ProductEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [categories, setCategories] = useState<Category[]>([]);

  const [form, setForm] = useState<ProductPayload>({
    name: "",
    price: 0,
    description_Product: "",
    categoryId: 1,
    unitId: 1,
    isBio: false,
    availability: true,
  });

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
    if (!id) return; // Sécurité

    productAPI
      .getById(Number(id))
      .then((product) => {
        setForm({
          name: product.name,
          price: product.price,
          description_Product: product.description_Product,
          categoryId: product.category.id,
          unitId: product.unit.id,
          isBio: product.isBio,
          availability: product.availability,
        });
      });
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    try {
      const response = await api.put(`/products/${Number(id)}`, {
        name: form.name,
        price: Number(form.price),
        description_Product: form.description_Product, 
        categoryId: form.categoryId, 
        unitId: form.unitId,
        isBio: form.isBio,
        availability: form.availability,
      });

      dispatch(updateProduct(response.data));

      alert("Produit mis à jour !");
      navigate("/producer/products");
    } catch (error) {
      console.error(error);
      alert("Erreur lors de la mise à jour.");
    }
  };

return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-900 mb-2">
          Modifier {form.name || 'le produit'}
        </h1>
        <p className="text-gray-600">
          Mettez à jour les informations de votre produit
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Nom du produit */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nom du produit *
          </label>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Ex: Tomates bio"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            value={form.description_Product}
            onChange={(e) =>
              setForm({ ...form, description_Product: e.target.value })
            }
            placeholder="Décrivez votre produit..."
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all resize-none"
          />
        </div>

        {/* Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Image du produit
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
            <input
              type="file"
              onChange={(e) => {
                const file = e.target.files?.[0];
                console.log("Fichier sélectionné:", file);
                // TODO: gérer l'upload plus tard
              }}
              accept="image/*"
              className="hidden"
              id="file-upload"
            />
            <label 
              htmlFor="file-upload"
              className="cursor-pointer flex flex-col items-center gap-2"
            >
              <span className="text-4xl">📷</span>
              <span className="text-sm text-gray-600">
                Cliquez pour choisir une image
              </span>
              <span className="text-xs text-gray-500">
                PNG, JPG jusqu'à 5MB
              </span>
            </label>
          </div>
        </div>

        {/* Prix et Catégorie (côte à côte) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Prix */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Prix (€) *
            </label>
            <input
              value={form.price}
              onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
              placeholder="0.00"
              type="number"
              min="0"
              step="0.01"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all bg-white"
            >
              <option value="">Choisir une catégorie</option>
              {categories?.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Options (checkboxes) */}
        <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
          <p className="text-sm font-medium text-gray-700 mb-3">Options</p>
          
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={form.isBio}
              onChange={(e) => setForm({ ...form, isBio: e.target.checked })}
              className="w-5 h-5 text-gray-900 border-gray-300 rounded focus:ring-2 focus:ring-gray-900 cursor-pointer"
            />
            <span className="text-gray-700 group-hover:text-gray-900 transition-colors">
              🌱 Produit bio
            </span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={form.availability}
              onChange={(e) => setForm({ ...form, availability: e.target.checked })}
              className="w-5 h-5 text-gray-900 border-gray-300 rounded focus:ring-2 focus:ring-gray-900 cursor-pointer"
            />
            <span className="text-gray-700 group-hover:text-gray-900 transition-colors">
              ✓ Produit disponible
            </span>
          </label>
        </div>

        {/* Boutons d'action */}
        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={() => navigate('/producer/products')}
            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
          >
            Annuler
          </button>
          <button
            type="submit"
            className="flex-1 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors duration-200 font-medium"
          >
            Mettre à jour
          </button>
        </div>
      </form>
    </div>
  );
};
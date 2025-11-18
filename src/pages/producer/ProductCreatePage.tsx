import { useState, useEffect } from "react";
import { categoryAPI, productAPI } from "../../api";
import { useNavigate } from "react-router-dom";
import type { ProductPayload } from "../../Types/product";
import type { Category } from "../../Types/category";
import { useAppDispatch } from "../../store/hooks";
import { addProduct } from "../../store/productsSlice";


export default function ProductCreatePage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categories = await categoryAPI.getAll(); // ← Directement les données
        console.log("Categories reçues:", categories);
        setCategories(categories);
      } catch (error) {
        console.error("Erreur:", error);
      }
    };

    loadCategories();
  }, []);

  const [form, setForm] = useState<ProductPayload>({
    name: "",
    description_Product: "",
    image_Product: null,
    price: 0,
    categoryId: 1,
    unitId: 1,
    isBio: false,
    availability: true,
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload: ProductPayload = {
      ...form,
      price: parseFloat(form.price.toString()),
    };
    console.log("Data envoyée:", payload);

    try {
      const newProduct = await productAPI.create(payload); // Recupere le produit créé
      dispatch(addProduct(newProduct)); //Ajoute au store redux
      navigate("/producer/products");
    } catch (error) {
      console.error("Erreur complète:", error);
      alert("Erreur lors de la création");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Créer un produit</h1>

      <input
        placeholder="Nom"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        placeholder="Prix"
        value={form.price}
        onChange={(e) =>
          setForm({ ...form, price: Number(e.target.value) || 0 })
        }
      />

      <textarea
        value={form.description_Product}
        onChange={(e) =>
          setForm({ ...form, description_Product: e.target.value })
        }
        placeholder="Description du produit"
        required
      />

      <input
        type="file"
        onChange={(e) => {
          /* gestion upload image */
        }}
        accept="image/*"
      />

      <select
        value={form.categoryId || ""} // ← Force une valeur vide si 0
        onChange={(e) =>
          setForm({ ...form, categoryId: Number(e.target.value) })
        }
        required
      >
        <option value="">Choisir une catégorie</option>{" "}
        {/* ← Option vide par défaut */}
        {categories?.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

      <label>
        <input
          type="checkbox"
          checked={form.isBio}
          onChange={(e) => setForm({ ...form, isBio: e.target.checked })}
        />
        Produit bio
      </label>

      <label>
        <input
          type="checkbox"
          checked={form.availability}
          onChange={(e) => setForm({ ...form, availability: e.target.checked })}
        />
        Disponible
      </label>

      <button type="submit">Créer</button>
    </form>
  );
}

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

      const formData = new FormData();
  formData.append('name', form.name);
  formData.append('description_Product', form.description_Product);
  formData.append('price', form.price.toString());
  formData.append('categoryId', form.categoryId.toString());
  formData.append('unitId', form.unitId.toString());
  formData.append('isBio', form.isBio.toString());
  formData.append('availability', form.availability.toString());

  if (form.image_Product) {
    formData.append('image_Product', form.image_Product);
  }
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
          const file = e.target.files?.[0];
          if (file) {
            setForm({ ...form, image_Product: file})
          }
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

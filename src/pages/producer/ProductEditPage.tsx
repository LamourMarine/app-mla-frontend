import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../api";
import type { Product, ProductPayload } from "../../Types/product";
import { productAPI, categoryAPI } from "../../api";
import type { Category } from "../../Types/category";

// Formulaire : on garde price en string pour éviter les bugs de saisie
// (l'input number renvoie toujours une string)

export const ProductEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
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
        const categories = await categoryAPI.getAll(); // ← Directement les données
        console.log("Categories reçues:", categories);
        setCategories(categories);
      } catch (error) {
        console.error("Erreur:", error);
      }
    };

    loadCategories();
  }, []);

  useEffect(() => {
    if (!id) return; // ← Sécurité

    productAPI
      .getById(Number(id)) // ← Corrigé
      .then((product) => {
        setProduct(product);
        setForm({
          name: product.name,
          price: product.price,
          description_Product: product.description,
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
      await api.put(`/products/${Number(id)}`, {
        // ← Corrigé (backticks)
        name: form.name,
        price: Number(form.price),
        description_Product: form.description_Product, // ← Ajouté
        categoryId: form.categoryId, // ← Ajouté
        unitId: form.unitId, // ← Ajouté
        isBio: form.isBio, // ← Ajouté
        availability: form.availability, // ← Ajouté
      });

      alert("Produit mis à jour !");
      navigate("/producer/products");
    } catch (error) {
      console.error(error);
      alert("Erreur lors de la mise à jour.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Modifier {form.name}</h1>

      <input
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })} // Copie toutes les propriétés actuelles du form (name et price), écrase uniquement la propriété "name" avec la nouvelle valeur
        placeholder="Nom du produit"
      />

      <input
        value={form.description_Product}
        onChange={(e) =>
          setForm({ ...form, description_Product: e.target.value })
        }
        placeholder="Description du produit"
      />

      <input
        type="file"
        onChange={(e) => {
          const file = e.target.files?.[0];
          console.log("Fichier sélectionné:", file);
          // TODO: gérer l'upload plus tard
        }}
        accept="image/*"
      />
      <input
        value={form.price}
        onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
        placeholder="Prix"
        type="number"
        min="0"
        step="0.01"
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

      <button type="submit">Mettre à jour</button>
    </form>
  );
};

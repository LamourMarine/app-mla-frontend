import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../api";
import type { Product } from "../../Types/product";

// Formulaire : on garde price en string pour éviter les bugs de saisie
// (l'input number renvoie toujours une string)
type ProductForm = {
  name: string;
  price: string; // string ici, converti en number seulement à l'envoi
};

export const ProductEditPage = () => {
  const { id } = useParams<{ id: string }>(); // Récupère l'id depuis l'URL
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null); // Produit depuis l'API
  const [form, setForm] = useState<ProductForm>({
    name: "",
    price: "",
  }); // État du formulaire (éditable)

  // ÉTAPE 1 : Charge le produit depuis l'API au montage
  useEffect(() => {
    if (!id) return; // Sécurité : si pas d'id, on fait rien

    api
      .get<Product>(`/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err));
  }, [id]); // Se déclenche quand id change

  // ÉTAPE 2 : Quand le produit est chargé, remplit le formulaire
  // (séparé du premier useEffect pour éviter les conflits)
  useEffect(() => {
    if (product) {
      setForm({
        name: product.name,
        price: String(product.price), //  Conversion number -> string pour l'input
      });
    }
  }, [product]); // Se déclenche quand product change

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    try {
      await api.put(`/products/${Number(id)}`, {
        name: form.name,
        price: Number(form.price), // Reconversion string -> number pour l'API
      });

      alert("Produit mis à jour !");
      navigate("/producer/products"); // Retour à la liste des produits
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
        value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
        placeholder="Prix"
        type="number"
        min="0"
        step="0.01"
      />

      <button type="submit">Mettre à jour</button>
    </form>
  );
};

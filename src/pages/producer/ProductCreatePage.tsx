import { useState } from "react";
import { productAPI } from "../../api";
import { useNavigate } from "react-router-dom";
import type {  ProductPayload } from '../../Types/product';

export default function ProductCreatePage() {
  const navigate = useNavigate();
const [form, setForm] = useState<ProductPayload>({
  name: "",
  price: 0,
  categoryId: 1,  
  unitId: 1,   
  isBio: false,
  availability: true
});
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const payload: ProductPayload = {
    ...form,
    price: Number(form.price),
  };

  await productAPI.create(payload);
  navigate("/producer/products");
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
        onChange={(e) => setForm({ ...form, price: Number(e.target.value) || 0 })}
      />

      <button type="submit">Créer</button>
    </form>
  );
}

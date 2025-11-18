// src/types/product.ts
export interface Product {
  id: number;
  name: string;
  description: string;
  imageProduct: string;
  isBio: boolean;
  price: number;
  availability: boolean;
  unit: {
    id: number;
    name: string;
  };
  category: {
    id: number;
    name: string;
  };
  seller: {
    id: number;
    name: string;
  };
}

export type ProductPayload = {
  name: string;
  price: number; // String car DECIMAL backend
  description_Product: string;
  categoryId: number;
  unitId: number;
  isBio: boolean;
  availability: boolean;
  image_Product?: string | null;
};
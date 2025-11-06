// src/types/product.ts
export interface Product {
  id: number;
  name: string;
  descriptionProduct: string;
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
  categoryId: number;
  unitId: number;
  isBio: boolean;
  availability: boolean;
  image?: File | string;
};
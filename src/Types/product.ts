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

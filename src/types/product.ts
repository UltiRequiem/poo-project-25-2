export interface Product {
  id: number;
  name: string;
  quantity_max: number;
  quantity_sold: number;
  price: number;
  created_at: string;
  updated_at: string;
}

export interface CreateProductInput {
  name: string;
  quantity_max: number;
  price: number;
  quantity_sold?: number; 
}

export interface UpdateProductInput {
  name?: string;
  quantity_max?: number;
  quantity_sold?: number;
  price?: number;
}
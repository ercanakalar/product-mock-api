export type ProductType = {
  createdAt: string;
  name: string;
  image: string;
  price: string;
  description: string;
  model: string;
  brand: string;
  id: string;
};

export interface ProductState {
  brands: Set<string>;
  models: Set<string>;
  selectedBrands: Set<string>;
  selectedModels: Set<string>;
  products: ProductType[];
  sort: string;
  searchTerm: string;
  pagination: number;
  totalProducts: number;
  productId: string;
}

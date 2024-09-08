export type Product = {
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
  products: Product[];
  sort: string;
  searchTerm: string;
  pagination?: number;
}

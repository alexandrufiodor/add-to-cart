export interface ProductType {
  id: number;
  name: string;
  category: Category;
  price: number;
}

interface Category {
  id: string;
  name: string;
}

export const productsAPI = {
  geProducts() {
    return fetch('http://localhost:3001/api/products/').then((response) => response);
  },
};

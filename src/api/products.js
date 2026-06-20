const API_URL = 'https://s5.cosibella.pl/api/test/products';

let cachedProducts = null;

export async function fetchProducts() {
  if (cachedProducts) {
    return cachedProducts;
  }

  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  cachedProducts = await response.json();
  return cachedProducts;
}

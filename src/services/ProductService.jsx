const API_URL = "https://fakestoreapi.com";

export async function getProducts() {
  const response = await fetch(`${API_URL}/products`);

  if (!response.ok) {
    throw new Error("Não foi possível carregar os produtos.");
  }

  return response.json();
}

export async function getProductById(id) {
  const response = await fetch(`${API_URL}/products/${id}`);

  if (!response.ok) {
    throw new Error("Não foi possível carregar o produto.");
  }

  return response.json();
}
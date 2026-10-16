/* ============================================================
   TRENDZO — Products API
   Fetches product data from FakeStoreAPI
   ============================================================ */

const BASE_URL = "https://fakestoreapi.com";

/**
 * Fetch all products.
 * @returns {Promise<Array>} list of products
 */
export async function fetchProducts() {
  const res = await fetch(`${BASE_URL}/products`);
  if (!res.ok) {
    throw new Error("Failed to load products");
  }
  return res.json();
}

/**
 * Fetch a single product by id.
 * (Not used yet, but handy for a future product detail page.)
 * @param {number|string} id
 * @returns {Promise<Object>} product
 */
export async function fetchProductById(id) {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  if (!res.ok) {
    throw new Error("Failed to load product");
  }
  return res.json();
}
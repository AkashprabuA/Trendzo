/* ============================================================
   TRENDZO — Products
   Fetches products from FakeStoreAPI, shows them in a grid,
   with a live search bar.
   ============================================================ */

import { useEffect, useState } from "react";
import { fetchProducts } from "../api/products.js";
import ProductCard from "../components/ProductCard.jsx";
import SearchBar from "../components/SearchBar.jsx";
import Loader from "../components/Loader.jsx";
import EmptyState from "../components/EmptyState.jsx";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  /* -------------------- FETCH ON MOUNT -------------------- */
  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        const data = await fetchProducts();
        if (!cancelled) setProducts(data);
      } catch (err) {
        if (!cancelled) setError("Could not load products. Try again later.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  /* -------------------- FILTER BY SEARCH -------------------- */
  const filtered = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  /* -------------------- RENDER -------------------- */
  if (loading) {
    return (
      <div>
        <h1 className="page-title">Products</h1>
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1 className="page-title">Products</h1>
        <EmptyState icon="⚠️" title="Something went wrong" text={error} />
      </div>
    );
  }

  return (
    <div>
      <h1 className="page-title">Products</h1>

      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Search products..."
      />

      {filtered.length === 0 ? (
        <EmptyState
          icon="🔍"
          title="No products found"
          text={`Nothing matches "${search}"`}
        />
      ) : (
        <div className="product-grid">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
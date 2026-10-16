/* ============================================================
   TRENDZO — ProductCard
   One product: image, category, title, price, Add to Cart button.
   Props:
     product → product object from FakeStoreAPI
   ============================================================ */

import { useApp } from "../context/AppContext.jsx";

export default function ProductCard({ product }) {
  const { addToCart, cart } = useApp();

  // Is this product already in the cart?
  const inCart = cart.some((item) => item.id === product.id);

  return (
    <div className="product-card">
      {/* Image */}
      <div className="product-card-image">
        <img src={product.image} alt={product.title} />
      </div>

      {/* Body */}
      <div className="product-card-body">
        <div className="product-card-category">{product.category}</div>
        <div className="product-card-title">{product.title}</div>

        <div className="product-card-footer">
          <span className="product-card-price">
            ${product.price.toFixed(2)}
          </span>

          <button
            className={inCart ? "btn btn-ghost" : "btn btn-primary"}
            onClick={() => addToCart(product)}
          >
            {inCart ? "In Cart ✓" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}
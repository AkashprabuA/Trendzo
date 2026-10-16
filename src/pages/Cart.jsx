/* ============================================================
   TRENDZO — Cart
   Shows all cart items, total price, and remove buttons.
   ============================================================ */

import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext.jsx";
import CartItem from "../components/CartItem.jsx";
import EmptyState from "../components/EmptyState.jsx";

export default function Cart() {
  const navigate = useNavigate();
  const { cart, cartTotal, clearCart } = useApp();

  /* -------------------- EMPTY CART -------------------- */
  if (cart.length === 0) {
    return (
      <div>
        <h1 className="page-title">Your Cart</h1>
        <EmptyState
          icon="🛒"
          title="Your cart is empty"
          text="Add some products to get started."
        />
        <div className="text-center mt-lg">
          <button
            className="btn btn-primary"
            onClick={() => navigate("/products")}
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  /* -------------------- CART WITH ITEMS -------------------- */
  return (
    <div>
      <h1 className="page-title">Your Cart</h1>

      <div className="cart-list">
        {cart.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>

      <div className="cart-summary">
        <div>
          <div className="cart-total-label">Total</div>
          <div className="cart-total-value">${cartTotal.toFixed(2)}</div>
        </div>

        <button className="btn btn-ghost" onClick={clearCart}>
          Clear Cart
        </button>
      </div>
    </div>
  );
}
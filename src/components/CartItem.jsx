/* ============================================================
   TRENDZO — CartItem
   One row in the cart.
   Props:
     item → cart item object ({ id, title, price, image, quantity })
   ============================================================ */

import { useApp } from "../context/AppContext.jsx";

export default function CartItem({ item }) {
  const { removeFromCart } = useApp();

  return (
    <div className="cart-item">
      {/* Image */}
      <div className="cart-item-image">
        <img src={item.image} alt={item.title} />
      </div>

      {/* Info */}
      <div className="cart-item-info">
        <div className="cart-item-title">{item.title}</div>
        <div className="cart-item-price">
          ${item.price.toFixed(2)} × {item.quantity}
        </div>
      </div>

      {/* Remove */}
      <button
        className="btn btn-danger"
        onClick={() => removeFromCart(item.id)}
      >
        Remove
      </button>
    </div>
  );
}
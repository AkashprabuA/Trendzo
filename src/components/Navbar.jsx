/* ============================================================
   TRENDZO — Navbar
   Frosted glass top bar with links + cart badge.
   ============================================================ */

import { NavLink } from "react-router-dom";
import { useApp } from "../context/AppContext.jsx";

export default function Navbar() {
  const { cartCount } = useApp();

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        {/* Logo */}
        <NavLink to="/products" className="navbar-logo">
          Trendzo
        </NavLink>

        {/* Links */}
        <div className="navbar-links">
          <NavLink
            to="/products"
            className={({ isActive }) =>
              "navbar-link" + (isActive ? " active" : "")
            }
          >
            Products
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              "navbar-link" + (isActive ? " active" : "")
            }
          >
            Cart
            {cartCount > 0 && (
              <span className="navbar-cart-badge">{cartCount}</span>
            )}
          </NavLink>

          <NavLink
            to="/profile"
            className={({ isActive }) =>
              "navbar-link" + (isActive ? " active" : "")
            }
          >
            Profile
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
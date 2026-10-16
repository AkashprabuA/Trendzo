/* ============================================================
   TRENDZO — Profile
   Shows user info and a logout button.
   ============================================================ */

import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext.jsx";

export default function Profile() {
  const navigate = useNavigate();
  const { user, logout, cartCount } = useApp();

  function handleLogout() {
    logout();
    navigate("/");
  }

  // First letter of the name for the avatar
  const initial = user?.name?.charAt(0).toUpperCase() || "?";

  return (
    <div>
      <h1 className="page-title">Profile</h1>

      <div className="card profile-card">
        <div className="profile-avatar">{initial}</div>
        <div className="profile-name">{user?.name}</div>
        <div className="profile-email">{user?.email}</div>

        <div className="cart-summary mt-lg">
          <div>
            <div className="cart-total-label">Items in cart</div>
            <div className="cart-total-value">{cartCount}</div>
          </div>

          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
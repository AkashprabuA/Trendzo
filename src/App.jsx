/* ============================================================
   TRENDZO — App
   All routes are defined here.
   ============================================================ */

import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

import Login from "./pages/Login.jsx";
import Products from "./pages/Products.jsx";
import Cart from "./pages/Cart.jsx";
import Profile from "./pages/Profile.jsx";

import { useApp } from "./context/AppContext.jsx";

export default function App() {
  const { user } = useApp();

  return (
    <>
      {/* Navbar only shows when logged in */}
      {user && <Navbar />}

      <main className="page">
        <div className="container">
          <Routes>
            {/* Public route */}
            <Route
              path="/"
              element={user ? <Navigate to="/products" replace /> : <Login />}
            />

            {/* Protected routes */}
            <Route
              path="/products"
              element={
                <ProtectedRoute>
                  <Products />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            {/* Catch-all → redirect home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </main>

      {/* Footer only shows when logged in */}
      {user && <Footer />}
    </>
  );
}
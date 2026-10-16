/* ============================================================
   TRENDZO — Login / Signup
   Simple localStorage-based auth (learning only, not secure).
   ============================================================ */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext.jsx";
import { findUser, addUser } from "../utils/storage";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useApp();

  // mode: "login" or "signup"
  const [mode, setMode] = useState("login");

  // form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  /* -------------------- SUBMIT -------------------- */
  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    // basic validation
    if (!email || !password || (mode === "signup" && !name)) {
      setError("Please fill in all fields.");
      return;
    }

    if (password.length < 4) {
      setError("Password must be at least 4 characters.");
      return;
    }

    if (mode === "login") {
      // find user
      const user = findUser(email);
      if (!user) {
        setError("No account found with that email.");
        return;
      }
      if (user.password !== password) {
        setError("Incorrect password.");
        return;
      }
      // success
      login({ name: user.name, email: user.email });
      navigate("/products");
    } else {
      // signup
      const existing = findUser(email);
      if (existing) {
        setError("An account with that email already exists.");
        return;
      }
      const newUser = { name, email, password };
      addUser(newUser);
      login({ name: newUser.name, email: newUser.email });
      navigate("/products");
    }
  }

  /* -------------------- SWITCH MODE -------------------- */
  function switchMode() {
    setMode(mode === "login" ? "signup" : "login");
    setError("");
    setName("");
    setEmail("");
    setPassword("");
  }

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <h1 className="auth-title">Trendzo</h1>
        <p className="auth-subtitle">
          {mode === "login" ? "Welcome back 👋" : "Create your account"}
        </p>

        <form className="form" onSubmit={handleSubmit}>
          {mode === "signup" && (
            <div className="form-group">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
              />
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••"
            />
          </div>

          {error && <div className="form-error">{error}</div>}

          <button type="submit" className="btn btn-primary btn-block">
            {mode === "login" ? "Login" : "Sign Up"}
          </button>
        </form>

        <div className="auth-switch">
          {mode === "login" ? (
            <>
              New here?{" "}
              <button type="button" onClick={switchMode}>
                Create an account
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button type="button" onClick={switchMode}>
                Login
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
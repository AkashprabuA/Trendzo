/* ============================================================
   TRENDZO — Storage Helpers
   All localStorage logic lives here.
   Keeps components clean — they just call these functions.
   ============================================================ */

const USERS_KEY = "trendzo_users";       // all registered users
const SESSION_KEY = "trendzo_session";   // currently logged-in user
const CART_KEY = "trendzo_cart";         // cart items

/* -------------------- USERS -------------------- */

/**
 * Get all registered users.
 * @returns {Array}
 */
export function getUsers() {
  const raw = localStorage.getItem(USERS_KEY);
  return raw ? JSON.parse(raw) : [];
}

/**
 * Save the full users list.
 * @param {Array} users
 */
export function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

/**
 * Find a user by email.
 * @param {string} email
 * @returns {Object|null}
 */
export function findUser(email) {
  const users = getUsers();
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase()) || null;
}

/**
 * Add a new user.
 * @param {{name: string, email: string, password: string}} user
 */
export function addUser(user) {
  const users = getUsers();
  users.push(user);
  saveUsers(users);
}

/* -------------------- SESSION -------------------- */

/**
 * Get the currently logged-in user.
 * @returns {Object|null}
 */
export function getSession() {
  const raw = localStorage.getItem(SESSION_KEY);
  return raw ? JSON.parse(raw) : null;
}

/**
 * Save the currently logged-in user.
 * @param {Object} user
 */
export function saveSession(user) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

/**
 * Clear the session (logout).
 */
export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

/* -------------------- CART -------------------- */

/**
 * Get cart items.
 * @returns {Array}
 */
export function getCart() {
  const raw = localStorage.getItem(CART_KEY);
  return raw ? JSON.parse(raw) : [];
}

/**
 * Save cart items.
 * @param {Array} cart
 */
export function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

/**
 * Clear the cart.
 */
export function clearCart() {
  localStorage.removeItem(CART_KEY);
}
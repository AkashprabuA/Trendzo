/* ============================================================
   TRENDZO — ProtectedRoute
   Blocks access to pages if the user is not logged in.
   Usage:
     <ProtectedRoute>
       <SomePage />
     </ProtectedRoute>
   ============================================================ */

import { Navigate } from "react-router-dom";
import { useApp } from "../context/AppContext.jsx";

export default function ProtectedRoute({ children }) {
  const { user } = useApp();

  // Not logged in → send to login page
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Logged in → render the page
  return children;
}
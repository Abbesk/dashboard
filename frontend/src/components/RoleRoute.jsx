import { Navigate } from "react-router-dom";

export default function RoleRoute({ role, allowedRoles, children }) {
  if (!allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}
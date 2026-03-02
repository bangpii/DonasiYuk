import { Navigate } from "react-router-dom";

const ProtectedAdminRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Navigate to="/user" replace />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/user" replace />;
  }

  return children;
};

export default ProtectedAdminRoute;
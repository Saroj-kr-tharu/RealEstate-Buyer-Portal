import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

  const ProtectedRoute = ({ children, requiredRole }) => {
  const authState = useSelector( (state) => state.auth ); 
  const isAuthenticated = authState.isLoggedIn ||  localStorage.getItem("token") !== null;




  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
   
  if (requiredRole) {
    
    const userRole = authState.role || localStorage.getItem('role') || 'unKnown';
    
    if (userRole !== requiredRole) {
      return <Navigate to="/login" replace />;
    }
  }
  
  return children;
};

export default ProtectedRoute;
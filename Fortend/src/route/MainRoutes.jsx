import { Route, Routes } from "react-router-dom";


import About from "../pages/About/About";
import AgentDashboard from "../pages/Agent/AgentDashboard";
import LoginCom from "../pages/Auth/LoginPage/LoginCom";
import RegisterCom from "../pages/Auth/RegisterPage/RegisterCom";
import BuyerDashboard from "../pages/Buyer/BuyerDashboard";
import Homepage from "../Pages/Homepage/Homepage";
import NotFound from "../pages/NotFound/NotFound";

import ProtectedRoute from "../pages/ProtectedRoute/ProtectedRoute";


function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="*" element={<NotFound />} />
      <Route path="About" element={<About />} />
      <Route path="Login" element={<LoginCom />} />
      <Route path="Signup" element={<RegisterCom />} />

       <Route path="/Agent" element={ <ProtectedRoute requiredRole="AGENT"> < AgentDashboard/> </ProtectedRoute>} />
       <Route path="/buyerDashboard" element={ <ProtectedRoute requiredRole="BUYER"> < BuyerDashboard/> </ProtectedRoute>} />

      </Routes>
  );
}

export default MainRoutes;

import { Route, Routes } from "react-router-dom";


import About from "../pages/About/About";
import Agent from "../pages/Agent/Agent";
import LoginCom from "../pages/Auth/LoginPage/LoginCom";
import RegisterCom from "../pages/Auth/RegisterPage/RegisterCom";
import Homepage from "../Pages/Homepage/Homepage";
import NotFound from "../pages/NotFound/NotFound";


function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="*" element={<NotFound />} />
      <Route path="Agent" element={<Agent />} />
      <Route path="About" element={<About />} />
      <Route path="Login" element={<LoginCom />} />
      <Route path="Signup" element={<RegisterCom />} />
     

      </Routes>
  );
}

export default MainRoutes;

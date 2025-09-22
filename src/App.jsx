import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./auth/pages/Login";
import Dashboard from "./pages/Dashboard";
import Layout from "./pages/Layout";
import UserMaster from "./pages/Masters/UserMaster";
import { Navigate } from "react-router-dom";
import ForgotPassword from "./Components.jsx/forgotpassword";
import NotFound from './pages/Notfound';
 
function App() {
  return (
    <Routes>
      {/* Redirect root "/" to "/login" */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* myroutes */}
      <Route path="/login" element={ <Login /> } />
      <Route path="/forgot-password" element={ <ForgotPassword /> } />
      <Route path="/layout" element={ <Layout /> } />
      <Route path="/dashboard" element={ <Layout> <Dashboard /> </Layout>}/>
      <Route path="/usermaster" element={ <Layout> <UserMaster/> </Layout>}/>

      {/* Catch all - Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
 
export default App;
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';
import Login from "./pages/Login";

import Layout from "./pages/Layout";
import Patients from "./pages/Patients";
import { Navigate } from "react-router-dom";
import ForgotPassword from "./Components.jsx/forgotpassword";
import NotFound from './pages/Notfound';
 
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Redirect root "/" to "/login" */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          {/* Public routes */}
          <Route
            path="/login"
            element={

                <Login />

            }
          />
          <Route
            path="/forgot-password"
            element={
                <ForgotPassword />
            }
          />
          {/* Private routes */}
          <Route
            path="/layout"
            element={
              <Layout />
            }
          />
          <Route
            path="/patients"
            element={
                <Patients />
            }
          />
 
          {/* Catch all - Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
 
export default App;
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';
import PublicRoutes from './Components.jsx/routes/PublicRoutes';
import PrivateRoutes from './Components.jsx/routes/PrivateRoute';
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import { Navigate } from "react-router-dom";
import ForgotPassword from "./Components.jsx/forgotpassword";
import NotFound from './pages/Notfound';
 
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route
            path="/login"
            element={
              <PublicRoutes>
                <Login />
              </PublicRoutes>
            }
          />
 
          <Route
            path="/forgot-password"
            element={
              <PublicRoutes>
                <ForgotPassword />
              </PublicRoutes>
            }
          />
 
          {/* Redirect root "/" to "/login" */}
          <Route path="/" element={<Navigate to="/login" replace />} />
 
          {/* Private routes */}
          <Route
            path="/dashboard/*"
            element={
              <PrivateRoutes>
                <Dashboard />
              </PrivateRoutes>
            }
          />
          <Route
            path="/patients"
            element={
              <PrivateRoutes>
                <Patients />
              </PrivateRoutes>
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
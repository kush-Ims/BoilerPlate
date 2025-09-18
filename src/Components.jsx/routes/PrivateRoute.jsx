import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../../pages/Dashboard";
import Patients from "../../pages/Patients";
import NotFound from "../../pages/Notfound";
import { useAuth } from '../../context/AuthContext';

export default function PrivateRoutes() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/patients" element={<Patients />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

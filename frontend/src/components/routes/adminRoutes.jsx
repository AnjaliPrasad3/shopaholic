import React from 'react';
import { Route } from "react-router-dom";
import ProtectedRoute from "../auth/ProtectedRoute";
import Dashboard from '../admin/Dashboard';

const adminRoutes = () => {
  return (
    <>
        <Route path="/admin/dashboard" element={
              <ProtectedRoute admin={true}>
                <Dashboard />
              </ProtectedRoute>
            } />
    </>
  )
}

export default adminRoutes
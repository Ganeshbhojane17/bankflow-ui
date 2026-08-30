import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

import LoginPage from "../features/auth/pages/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterPage";
import DashboardPage from "../features/dashboard/pages/DashboardPage";
import ProtectedRoute from "./ProtectedRoute";
import CustomerListPage from "../features/customer/pages/CustomerListPage";
import CustomerFormPage from "../features/customer/pages/CustomerFormPage";
import CustomerViewPage from "../features/customer/pages/CustomerViewPage";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/login" element={<LoginPage />} />

                <Route path="/register" element={<RegisterPage />} />

                {/* Protected routes */}
            <Route element={<ProtectedRoute />}>

                <Route element={<MainLayout />}>

                    <Route
                        path="/dashboard"
                        element={<DashboardPage />}
                    />

                    <Route
                        path="/customers"
                        element={<CustomerListPage />}
                    />
                    <Route
                        path="/customers/add"
                        element={<CustomerFormPage />}
                    />

                    <Route
                        path="/customers/edit/:id"
                        element={<CustomerFormPage />}
                   />

                   <Route
                        path="/customers/view/:id"
                        element={<CustomerViewPage />}
                   />

                </Route>

            </Route>


                {/* Default Route */}
                <Route path="/" element={<Navigate to="/login" replace />} />

                {/* Unknown Route */}
                <Route path="*" element={<Navigate to="/login" replace />} />

            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;
import { Outlet } from "react-router-dom";

import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";
import Footer from "../components/layout/Footer";

import "./MainLayout.css";

function MainLayout() {

    return (
        <div className="app-layout">

            <Header />

            <Sidebar />

            <div className="main-section">

                <main className="page-content">
                    <Outlet />
                </main>

                <Footer />

            </div>

        </div>
    );
}

export default MainLayout;
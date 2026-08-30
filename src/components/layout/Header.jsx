import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import ProfileMenu from "./ProfileMenu";

import { logout } from "../../features/auth/authSlice";
import { logoutUser } from "../../features/auth/services/authService";

import "./Header.css";

function Header() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {

        try {
            await logoutUser();
        }
        catch (error) {
            console.error("Logout failed:", error);
        }

        dispatch(logout());

        navigate("/login", {
            replace: true
        });
    };

    return (
        <header className="app-header">

            <div className="header-left">
                <h1 className="header-title">
                    BankFlow CRM
                </h1>
            </div>

            <div className="header-right">

                <button
                    type="button"
                    className="notification-button"
                    aria-label="Notifications"
                >
                    🔔
                </button>

                <ProfileMenu
                    onLogout={handleLogout}
                />

            </div>

        </header>
    );
}

export default Header;
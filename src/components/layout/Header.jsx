import {
    AppBar,
    Toolbar,
    Typography,
    IconButton
} from "@mui/material";

import NotificationsIcon from "@mui/icons-material/Notifications";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import ProfileMenu from "./ProfileMenu";
import { logout } from "../../features/auth/authSlice";
import { logoutUser } from "../../features/auth/services/authService";

function Header() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

   const handleLogout = async () => {

    await logoutUser();

    dispatch(logout());

    navigate("/login", { replace: true });

};

    return (

        <AppBar position="fixed">

            <Toolbar>

                <Typography
                    variant="h6"
                    sx={{ flexGrow: 1 }}
                >
                    BankFlow CRM
                </Typography>

                <IconButton color="inherit">
                    <NotificationsIcon />
                </IconButton>

                <ProfileMenu onLogout={handleLogout} />

            </Toolbar>

        </AppBar>

    );

}

export default Header;
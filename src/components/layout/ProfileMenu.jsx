import { useState } from "react";

import {
    Avatar,
    IconButton,
    Menu,
    MenuItem
} from "@mui/material";

function ProfileMenu({ onLogout }) {

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <IconButton
                color="inherit"
                onClick={(e) => setAnchorEl(e.currentTarget)}
            >
                <Avatar>G</Avatar>
            </IconButton>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>
                    Profile
                </MenuItem>

                <MenuItem onClick={handleClose}>
                    Settings
                </MenuItem>

                <MenuItem
                    onClick={() => {
                        handleClose();
                        onLogout();
                    }}
                >
                    Logout
                </MenuItem>

            </Menu>

        </>
    );
}

export default ProfileMenu;
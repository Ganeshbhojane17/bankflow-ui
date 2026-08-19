import {
    ListItemButton,
    ListItemIcon,
    ListItemText
} from "@mui/material";

import { Link } from "react-router-dom";

function NavigationItem({ item }) {

    return (

        <ListItemButton
            component={Link}
            to={item.path}
        >

            <ListItemIcon>

                {item.icon}

            </ListItemIcon>

            <ListItemText
                primary={item.title}
            />

        </ListItemButton>

    );

}

export default NavigationItem;
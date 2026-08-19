import {
    Drawer,
    Toolbar,
    List
} from "@mui/material";

import navigation from "../../utils/navigation";

import NavigationItem from "./NavigationItem";

const drawerWidth = 250;

function Sidebar() {

    return (

        <Drawer

            variant="permanent"

            sx={{

                width: drawerWidth,

                flexShrink: 0,

                "& .MuiDrawer-paper": {

                    width: drawerWidth,

                    boxSizing: "border-box"

                }

            }}

        >

            <Toolbar />

            <List>

                {

                    navigation.map(item => (

                        <NavigationItem

                            key={item.title}

                            item={item}

                        />

                    ))

                }

            </List>

        </Drawer>

    );

}

export default Sidebar;
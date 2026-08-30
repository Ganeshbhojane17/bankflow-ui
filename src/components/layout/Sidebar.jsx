import navigation from "../../utils/navigation";
import NavigationItem from "./NavigationItem";

import "./Sidebar.css";

function Sidebar() {

    return (
        <aside className="sidebar">

            <nav className="sidebar-nav">

                {navigation.map((item) => (
                    <NavigationItem
                        key={item.title}
                        item={item}
                    />
                ))}

            </nav>

        </aside>
    );
}

export default Sidebar;
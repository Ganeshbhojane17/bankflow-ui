import { NavLink } from "react-router-dom";
import "./NavigationItem.css";

function NavigationItem({ item }) {
    return (
        <NavLink
            to={item.path}
            className={({ isActive }) =>
                `navigation-item ${isActive ? "active" : ""}`
            }
        >
            <span className="navigation-icon">
                {item.icon}
            </span>

            <span className="navigation-title">
                {item.title}
            </span>
        </NavLink>
    );
}

export default NavigationItem;
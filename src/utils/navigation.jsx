import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AssessmentIcon from "@mui/icons-material/Assessment";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import SettingsIcon from "@mui/icons-material/Settings";

const navigation = [

    {
        title: "Dashboard",
        icon: <DashboardIcon />,
        path: "/dashboard"
    },

    {
        title: "Customers",
        icon: <PeopleIcon />,
        path: "/customers"
    },

    {
        title: "Accounts",
        icon: <AccountBalanceIcon />,
        path: "/accounts"
    },

    {
        title: "Loans",
        icon: <CreditCardIcon />,
        path: "/loans"
    },

    {
        title: "Reports",
        icon: <AssessmentIcon />,
        path: "/reports"
    },

    {
        title: "AI Assistant",
        icon: <SmartToyIcon />,
        path: "/ai"
    },

    {
        title: "Settings",
        icon: <SettingsIcon />,
        path: "/settings"
    }

];

export default navigation;
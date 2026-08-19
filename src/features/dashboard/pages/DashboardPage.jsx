import Grid from "@mui/material/Grid";

import MainLayout from "../../../layouts/MainLayout";
import DashboardHeader from "../components/DashboardHeader";
import DashboardCard from "../../../components/dashboard/DashboardCard";
import RecentCustomers from "../components/RecentCustomers";

import PeopleIcon from "@mui/icons-material/People";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import PendingActionsIcon from "@mui/icons-material/PendingActions";

function DashboardPage() {

    return (

        <MainLayout>

            <DashboardHeader />

            {/* KPI Cards */}

            <Grid container spacing={3}>

                <Grid item xs={12} sm={6} lg={3}>
                    <DashboardCard
                        title="Customers"
                        value={1250}
                        icon={<PeopleIcon />}
                        color="#1565C0"
                    />
                </Grid>

                <Grid item xs={12} sm={6} lg={3}>
                    <DashboardCard
                        title="Accounts"
                        value={560}
                        icon={<AccountBalanceIcon />}
                        color="#2E7D32"
                    />
                </Grid>

                <Grid item xs={12} sm={6} lg={3}>
                    <DashboardCard
                        title="Loans"
                        value={52}
                        icon={<CreditCardIcon />}
                        color="#ED6C02"
                    />
                </Grid>

                <Grid item xs={12} sm={6} lg={3}>
                    <DashboardCard
                        title="Pending"
                        value={18}
                        icon={<PendingActionsIcon />}
                        color="#D32F2F"
                    />
                </Grid>

            </Grid>

            {/* Dashboard Widgets */}

            <Grid
                container
                spacing={3}
                sx={{ mt: 1 }}
            >

                {/* Left */}

                <Grid item xs={12} lg={8}>

                    <RecentCustomers />

                </Grid>

                {/* Right */}

                <Grid item xs={12} lg={4}>

                    {/* Loan Chart will go here */}

                </Grid>

            </Grid>

        </MainLayout>

    );

}

export default DashboardPage;
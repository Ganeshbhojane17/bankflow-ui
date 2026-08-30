import DashboardHeader from "../components/DashboardHeader";
import DashboardCard from "../components/DashboardCard";
import RecentCustomers from "../components/RecentCustomers";

import "./DashboardPage.css";

function DashboardPage() {

    return (
        <div className="dashboard-page">

            <DashboardHeader />

            {/* KPI Cards */}
            <div className="dashboard-cards">

                <DashboardCard
                    title="Customers"
                    value="1,250"
                    icon="👥"
                    color="blue"
                />

                <DashboardCard
                    title="Accounts"
                    value="560"
                    icon="🏦"
                    color="green"
                />

                <DashboardCard
                    title="Loans"
                    value="52"
                    icon="💳"
                    color="orange"
                />

                <DashboardCard
                    title="Pending"
                    value="18"
                    icon="⏳"
                    color="red"
                />

            </div>

            {/* Dashboard Widgets */}
            <div className="dashboard-widgets">

                <div className="recent-customers-section">
                    <RecentCustomers />
                </div>

                <div className="loan-chart-section">
                    <div className="dashboard-widget">
                        <h3>Loan Overview</h3>

                        <div className="empty-widget">
                            Loan chart will be added here
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
}

export default DashboardPage;
import "./DashboardCard.css";

function DashboardCard({
    title,
    value,
    icon,
    color
}) {

    return (
        <div className={`dashboard-card ${color}`}>

            <div className="dashboard-card-content">

                <div>
                    <div className="dashboard-card-title">
                        {title}
                    </div>

                    <div className="dashboard-card-value">
                        {value}
                    </div>
                </div>

                <div className="dashboard-card-icon">
                    {icon}
                </div>

            </div>

        </div>
    );
}

export default DashboardCard;
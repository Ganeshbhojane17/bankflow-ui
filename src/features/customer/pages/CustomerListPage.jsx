import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCustomers, deleteCustomer } from "../services/customerApi";
import { getCustomerFileUrl } from "../../../utils/fileUrl";
import "./CustomerListPage.css";

function CustomerListPage() {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const loadCustomers = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await getCustomers({ pageNumber: 1, pageSize: 10 });
            setCustomers(response.data?.items || []);
        } catch (err) {
            setError(err?.response?.data?.message || "Unable to load customers.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCustomers();
    }, []);

    const handleDelete = async (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this customer?");
        if (!confirmed) return;

        try {
            await deleteCustomer(id);
            await loadCustomers();
        } catch (err) {
            setError(err?.response?.data?.message || "Unable to delete customer.");
        }
    };

    if (loading) {
        return <div className="customer-loading">Loading customers...</div>;
    }

    if (error) {
        return (
            <div className="customer-error">
                <p>{error}</p>
                <button onClick={loadCustomers}>Retry</button>
            </div>
        );
    }

    return (
        <div className="customer-page">
            {/* Page Header */}
            <div className="customer-page-header">
                <div>
                    <h1>Customers</h1>
                    <p>Manage your CRM customers</p>
                </div>

                <button
                    className="customer-add-button"
                    onClick={() => navigate("/customers/add")}
                >
                    + Add Customer
                </button>
            </div>

            {/* Empty State */}
            {customers.length === 0 ? (
                <div className="customer-empty">No customers found.</div>
            ) : (
                <div className="customer-table-container">
                    <table className="customer-table">
                        <thead>
                            <tr>
                                <th>Customer #</th>
                                <th>Customer</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>City</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {customers.map(customer => (
                                <tr key={customer.id}>
                                    {/* Customer Number */}
                                    <td className="customer-number">{customer.customerNumber}</td>

                                    {/* Customer */}
                                    <td>
                                        <div className="customer-info">
                                            <div className="customer-profile">
                                                {customer.profileImagePath ? (
                                                    <img
                                                        src={getCustomerFileUrl(customer.profileImagePath)}
                                                        alt={customer.fullName}
                                                        className="customer-profile-image"
                                                        onError={(event) => {
                                                            event.currentTarget.style.display = "none";
                                                            event.currentTarget.nextElementSibling.style.display = "flex";
                                                        }}
                                                    />
                                                ) : null}

                                                <div
                                                    className="customer-profile-placeholder"
                                                    style={{
                                                        display: customer.profileImagePath ? "none" : "flex"
                                                    }}
                                                >
                                                    👤
                                                </div>
                                            </div>

                                            <div className="customer-name">
                                                {customer.fullName}
                                            </div>
                                        </div>
                                    </td>

                                    {/* Email */}
                                    <td>{customer.email}</td>

                                    {/* Phone */}
                                    <td>{customer.phoneNumber || "-"}</td>

                                    {/* City */}
                                    <td>{customer.city || "-"}</td>

                                    {/* Status */}
                                    <td>
                                        <span
                                            className={`customer-status ${
                                                customer.isActive ? "active" : "inactive"
                                            }`}
                                        >
                                            {customer.isActive ? "Active" : "Inactive"}
                                        </span>
                                    </td>

                                    {/* Actions */}
                                    <td>
                                        <div className="customer-actions">
                                            <button className="customer-action-button"  onClick={() => navigate(`/customers/view/${customer.id}`)}>
                                                View
                                            </button>

                                            <button
                                                className="customer-action-button"
                                                onClick={() => navigate(`/customers/edit/${customer.id}`)}
                                            >
                                                Edit
                                            </button>

                                            <button
                                                className="customer-action-button delete"
                                                onClick={() => handleDelete(customer.id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default CustomerListPage;


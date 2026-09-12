import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCustomers, deleteCustomer } from "../services/customerApi";
import { getCustomerFileUrl } from "../../../utils/fileUrl";
import "./CustomerListPage.css";

function CustomerListPage() {
    const navigate = useNavigate();

    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Pagination
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize] = useState(10);
    const [totalRecords, setTotalRecords] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    // Filters
    const [search, setSearch] = useState("");
    const [isActive, setIsActive] = useState("");

    const loadCustomers = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await getCustomers({
                pageNumber,
                pageSize,
                search: search || undefined,
                isActive: isActive === "" ? undefined : isActive === "true"
            });

            const data = response.data;

            setCustomers(data?.items || []);
            setTotalRecords(data?.totalRecords || 0);
            setTotalPages(data?.totalPages || 0);
        } catch (err) {
            console.error(err);
            setError(err?.response?.data?.message || "Unable to load customers.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCustomers();
    }, [pageNumber, search, isActive]);

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
        setPageNumber(1);
    };

    const handleStatusChange = (event) => {
        setIsActive(event.target.value);
        setPageNumber(1);
    };

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
            {/* Header */}
            <div className="customer-page-header">
                <div>
                    <h1>Customers List</h1>
                    <p>Manage your CRM customers</p>
                </div>

                <button
                    className="customer-add-button"
                    onClick={() => navigate("/customers/add")}
                >
                    + Add Customer
                </button>
            </div>

            {/* Filters */}
            <div className="customer-filters">
                <input
                    type="text"
                    placeholder="Search customers..."
                    value={search}
                    onChange={handleSearchChange}
                    className="customer-search"
                />

                <select
                    value={isActive}
                    onChange={handleStatusChange}
                    className="customer-status-filter"
                >
                    <option value="">All Status</option>
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                </select>
            </div>

            <div className="customer-result-count">
                Showing {customers.length} of {totalRecords} customers
            </div>

            {customers.length === 0 ? (
                <div className="customer-empty">No customers found.</div>
            ) : (
                <>
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
                                {customers.map((customer) => (
                                    <tr key={customer.id}>
                                        <td className="customer-number">
                                            {customer.customerNumber}
                                        </td>

                                        <td>
                                            <div className="customer-info">
                                                <div className="customer-profile">
                                                    {customer.profileImagePath ? (
                                                        <img
                                                            src={getCustomerFileUrl(customer.profileImagePath)}
                                                            alt={customer.fullName}
                                                            className="customer-profile-image"
                                                        />
                                                    ) : (
                                                        <div className="customer-profile-placeholder">
                                                            👤
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="customer-name">
                                                    {customer.fullName}
                                                </div>
                                            </div>
                                        </td>

                                        <td>{customer.email}</td>
                                        <td>{customer.phoneNumber || "-"}</td>
                                        <td>{customer.city || "-"}</td>

                                        <td>
                                            <span
                                                className={`customer-status ${
                                                    customer.isActive ? "active" : "inactive"
                                                }`}
                                            >
                                                {customer.isActive ? "Active" : "Inactive"}
                                            </span>
                                        </td>

                                        <td>
                                            <div className="customer-actions">
                                                <button
                                                    className="customer-action-button"
                                                    onClick={() =>
                                                        navigate(`/customers/view/${customer.id}`)
                                                    }
                                                >
                                                    View
                                                </button>

                                                <button
                                                    className="customer-action-button"
                                                    onClick={() =>
                                                        navigate(`/customers/edit/${customer.id}`)
                                                    }
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

                    {/* Pagination */}
                    <div className="customer-pagination">
                        <button
                            disabled={pageNumber === 1}
                            onClick={() => setPageNumber((previous) => previous - 1)}
                        >
                            Previous
                        </button>

                        <span>
                            Page {pageNumber} of {totalPages}
                        </span>

                        <button
                            disabled={pageNumber === totalPages}
                            onClick={() => setPageNumber((previous) => previous + 1)}
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default CustomerListPage;

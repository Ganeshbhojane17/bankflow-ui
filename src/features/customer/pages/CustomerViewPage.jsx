import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getCustomerById } from "../services/customerApi";
import { getCustomerFileUrl } from "../../../utils/fileUrl";

import "./CustomerViewPage.css";

function CustomerViewPage() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [customer, setCustomer] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {

        const loadCustomer = async () => {

            try {

                setLoading(true);

                setError("");

                const response =
                    await getCustomerById(id);

                setCustomer(response.data);

            }
            catch (err) {

                console.error(err);

                setError(
                    err?.response?.data?.message ||
                    "Unable to load customer."
                );

            }
            finally {

                setLoading(false);

            }
        };

        loadCustomer();

    }, [id]);


    if (loading) {

        return (
            <div className="customer-view-loading">
                Loading customer...
            </div>
        );

    }


    if (error) {

        return (
            <div className="customer-view-error">

                <p>{error}</p>

                <button
                    onClick={() =>
                        navigate("/customers")
                    }
                >
                    Back to Customers
                </button>

            </div>
        );

    }


    if (!customer) {

        return (
            <div className="customer-view-error">
                Customer not found.
            </div>
        );

    }


    const profileImageUrl =
        customer.profileImagePath
            ? getCustomerFileUrl(
                customer.profileImagePath
            )
            : null;


    const documentUrl =
        customer.documentPath
            ? getCustomerFileUrl(
                customer.documentPath
            )
            : null;


    return (

        <div className="customer-view-page">

            {/* Header */}

            <div className="customer-view-header">

                <div>

                    <h1>
                        Customer Details
                    </h1>

                    <p>
                        View customer information
                    </p>

                </div>


                <div className="customer-view-actions">

                    <button
                        className="customer-view-back-button"
                        onClick={() =>
                            navigate("/customers")
                        }
                    >
                        Back
                    </button>

                    <button
                        className="customer-view-edit-button"
                        onClick={() =>
                            navigate(
                                `/customers/edit/${customer.id}`
                            )
                        }
                    >
                        Edit
                    </button>

                </div>

            </div>


            {/* Profile */}

            <div className="customer-profile-card">

                <div className="customer-view-profile">

                    {profileImageUrl ? (

                        <img
                            src={profileImageUrl}
                            alt={customer.fullName}
                        />

                    ) : (

                        <div className="customer-view-placeholder">
                            👤
                        </div>

                    )}

                </div>


                <div>

                    <h2>
                        {customer.fullName}
                    </h2>

                    <p>
                        {customer.customerNumber}
                    </p>

                    <span
                        className={
                            customer.isActive
                                ? "customer-view-status active"
                                : "customer-view-status inactive"
                        }
                    >
                        {customer.isActive
                            ? "Active"
                            : "Inactive"}
                    </span>

                </div>

            </div>


            {/* Personal Information */}

            <div className="customer-details-card">

                <h2>
                    Personal Information
                </h2>

                <div className="customer-details-grid">

                    <Detail
                        label="First Name"
                        value={customer.firstName}
                    />

                    <Detail
                        label="Last Name"
                        value={customer.lastName}
                    />

                    <Detail
                        label="Email"
                        value={customer.email}
                    />

                    <Detail
                        label="Phone"
                        value={customer.phoneNumber}
                    />

                    <Detail
                        label="Date of Birth"
                        value={
                            customer.dateOfBirth
                                ? customer.dateOfBirth.substring(0, 10)
                                : "-"
                        }
                    />

                    <Detail
                        label="Gender"
                        value={customer.gender}
                    />

                    <Detail
                        label="PAN Number"
                        value={customer.panNumber}
                    />

                    <Detail
                        label="Aadhaar Number"
                        value={customer.aadhaarNumber}
                    />

                </div>

            </div>


            {/* Professional Information */}

            <div className="customer-details-card">

                <h2>
                    Professional Information
                </h2>

                <div className="customer-details-grid">

                    <Detail
                        label="Occupation"
                        value={customer.occupation}
                    />

                    <Detail
                        label="Annual Income"
                        value={
                            customer.annualIncome
                                ? `₹ ${customer.annualIncome}`
                                : "-"
                        }
                    />

                </div>

            </div>


            {/* Address */}

            <div className="customer-details-card">

                <h2>
                    Address
                </h2>

                <div className="customer-details-grid">

                    <Detail
                        label="Address"
                        value={customer.address}
                    />

                    <Detail
                        label="City"
                        value={customer.city}
                    />

                    <Detail
                        label="State"
                        value={customer.state}
                    />

                    <Detail
                        label="Country"
                        value={customer.country}
                    />

                    <Detail
                        label="Postal Code"
                        value={customer.postalCode}
                    />

                </div>

            </div>


            {/* Document */}

            <div className="customer-details-card">

                <h2>
                    Document
                </h2>

                {documentUrl ? (

                    <div className="customer-document">

                        <div>

                            <strong>
                                {customer.documentName}
                            </strong>

                            <p>
                                {customer.documentContentType}
                            </p>

                        </div>


                        <a
                            href={documentUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="customer-document-button"
                        >
                            View PDF
                        </a>

                    </div>

                ) : (

                    <p>
                        No document uploaded.
                    </p>

                )}

            </div>

        </div>
    );
}


function Detail({ label, value }) {

    return (

        <div className="customer-detail-item">

            <span>
                {label}
            </span>

            <strong>
                {value || "-"}
            </strong>

        </div>

    );

}


export default CustomerViewPage;
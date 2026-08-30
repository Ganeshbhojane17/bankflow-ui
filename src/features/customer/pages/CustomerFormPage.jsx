import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    createCustomer,
    getCustomerById,
    updateCustomer
} from "../services/customerApi";

import CustomerForm from "../components/CustomerForm";

import "./CustomerFormPage.css";

const initialForm = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
    gender: "",
    panNumber: "",
    aadhaarNumber: "",
    occupation: "",
    annualIncome: "",
    address: "",
    city: "",
    state: "",
    country: "",
    postalCode: ""
};

function CustomerFormPage() {

    const { id } = useParams();

    const navigate = useNavigate();

    const isEditMode = Boolean(id);

    const [form, setForm] = useState(initialForm);

    const [profileImage, setProfileImage] = useState(null);

    const [document, setDocument] = useState(null);

    const [existingProfileImage, setExistingProfileImage] =
        useState(null);

    const [existingDocument, setExistingDocument] =
        useState(null);

    const [loading, setLoading] = useState(false);

    const [saving, setSaving] = useState(false);

    const [error, setError] = useState("");


    // ==========================================
    // Load customer for EDIT
    // ==========================================

    useEffect(() => {

        if (!isEditMode)
            return;

        const loadCustomer = async () => {

            try {

                setLoading(true);
                setError("");

                const response =
                    await getCustomerById(id);

                // Based on your current API structure
                const customer = response.data;

                setForm({
                    firstName:
                        customer.firstName || "",

                    lastName:
                        customer.lastName || "",

                    email:
                        customer.email || "",

                    phoneNumber:
                        customer.phoneNumber || "",

                    dateOfBirth:
                        customer.dateOfBirth
                            ? customer.dateOfBirth.substring(0, 10)
                            : "",

                    gender:
                        customer.gender || "",

                    panNumber:
                        customer.panNumber || "",

                    aadhaarNumber:
                        customer.aadhaarNumber || "",

                    occupation:
                        customer.occupation || "",

                    annualIncome:
                        customer.annualIncome ?? "",

                    address:
                        customer.address || "",

                    city:
                        customer.city || "",

                    state:
                        customer.state || "",

                    country:
                        customer.country || "",

                    postalCode:
                        customer.postalCode || ""
                });

                setExistingProfileImage(
                    customer.profileImagePath
                );

                setExistingDocument({
                    path: customer.documentPath,
                    name: customer.documentName,
                    contentType:
                        customer.documentContentType
                });

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

    }, [id, isEditMode]);


    // ==========================================
    // Form field change
    // ==========================================

    const handleChange = (event) => {

        const {
            name,
            value
        } = event.target;

        setForm(previous => ({
            ...previous,
            [name]: value
        }));
    };


    // ==========================================
    // Profile image
    // ==========================================

    const handleProfileImageChange = (file) => {

        setProfileImage(file);

    };


    // ==========================================
    // Document
    // ==========================================

    const handleDocumentChange = (file) => {

        setDocument(file);

    };


    // ==========================================
    // Submit
    // ==========================================

    const handleSubmit = async (event) => {

        event.preventDefault();

        try {

            setSaving(true);
            setError("");

            const formData = new FormData();


            // Add normal fields

            Object.entries(form).forEach(
                ([key, value]) => {

                    if (
                        value !== null &&
                        value !== undefined
                    ) {

                        formData.append(
                            key,
                            value
                        );

                    }

                }
            );


            // Add profile image only
            // when user selected a new one

            if (profileImage) {

                formData.append(
                    "profileImage",
                    profileImage
                );

            }


            // Add document only
            // when user selected a new one

            if (document) {

                formData.append(
                    "document",
                    document
                );

            }


            // Debug - useful while learning

            console.log(
                "Submitting customer..."
            );

            for (const pair of formData.entries()) {

                console.log(
                    pair[0],
                    pair[1]
                );

            }


            if (isEditMode) {

                await updateCustomer(
                    id,
                    formData
                );

            }
            else {

                await createCustomer(
                    formData
                );

            }


            navigate("/customers");

        }
        catch (err) {

            console.error(
                "Customer save error:",
                err
            );

            setError(
                err?.response?.data?.message ||
                "Unable to save customer."
            );

        }
        finally {

            setSaving(false);

        }

    };


    if (loading) {

        return (
            <div className="customer-form-loading">
                Loading customer...
            </div>
        );

    }


    return (

        <div className="customer-form-page">

            <div className="customer-form-header">

                <div>

                    <h1>
                        {
                            isEditMode
                                ? "Edit Customer"
                                : "Add Customer"
                        }
                    </h1>

                    <p>
                        {
                            isEditMode
                                ? "Update customer information"
                                : "Create a new CRM customer"
                        }
                    </p>

                </div>

            </div>


            {error && (

                <div className="customer-form-error">
                    {error}
                </div>

            )}


            <CustomerForm

                form={form}

                isEditMode={isEditMode}

                existingProfileImage={
                    existingProfileImage
                }

                existingDocument={
                    existingDocument
                }

                profileImage={
                    profileImage
                }

                document={
                    document
                }

                saving={saving}

                onChange={handleChange}

                onProfileImageChange={
                    handleProfileImageChange
                }

                onDocumentChange={
                    handleDocumentChange
                }

                onSubmit={handleSubmit}

                onCancel={() =>
                    navigate("/customers")
                }

            />

        </div>

    );

}

export default CustomerFormPage;
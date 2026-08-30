import FileUpload from "./FileUpload";

import { getCustomerFileUrl } from "../../../utils/fileUrl";

function CustomerForm({
    form,
    isEditMode,
    existingProfileImage,
    existingDocument,
    profileImage,
    document,
    saving,
    onChange,
    onProfileImageChange,
    onDocumentChange,
    onSubmit,
    onCancel
}) {

    return (

        <form
            className="customer-form"
            onSubmit={onSubmit}
        >

            {/* ================================= */}
            {/* PERSONAL INFORMATION */}
            {/* ================================= */}

            <section className="form-section">

                <h2>
                    Personal Information
                </h2>

                <div className="form-grid">

                    <div className="form-group">

                        <label>
                            First Name *
                        </label>

                        <input
                            type="text"
                            name="firstName"
                            value={form.firstName}
                            onChange={onChange}
                            required
                        />

                    </div>


                    <div className="form-group">

                        <label>
                            Last Name *
                        </label>

                        <input
                            type="text"
                            name="lastName"
                            value={form.lastName}
                            onChange={onChange}
                            required
                        />

                    </div>


                    <div className="form-group">

                        <label>
                            Email *
                        </label>

                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={onChange}
                            required
                        />

                    </div>


                    <div className="form-group">

                        <label>
                            Phone Number
                        </label>

                        <input
                            type="tel"
                            name="phoneNumber"
                            value={form.phoneNumber}
                            onChange={onChange}
                        />

                    </div>


                    <div className="form-group">

                        <label>
                            Date of Birth
                        </label>

                        <input
                            type="date"
                            name="dateOfBirth"
                            value={form.dateOfBirth}
                            onChange={onChange}
                        />

                    </div>


                    <div className="form-group">

                        <label>
                            Gender
                        </label>

                        <select
                            name="gender"
                            value={form.gender}
                            onChange={onChange}
                        >

                            <option value="">
                                Select Gender
                            </option>

                            <option value="Male">
                                Male
                            </option>

                            <option value="Female">
                                Female
                            </option>

                            <option value="Other">
                                Other
                            </option>

                        </select>

                    </div>

                </div>

            </section>


            {/* ================================= */}
            {/* PROFILE IMAGE */}
            {/* ================================= */}

            <section className="form-section">

                <h2>
                    Profile Image
                </h2>

                <FileUpload
                    type="image"
                    selectedFile={profileImage}
                    existingFile={
                        existingProfileImage
                    }
                    onFileChange={
                        onProfileImageChange
                    }
                />

            </section>


            {/* ================================= */}
            {/* IDENTITY & EMPLOYMENT */}
            {/* ================================= */}

            <section className="form-section">

                <h2>
                    Identity & Employment
                </h2>

                <div className="form-grid">

                    <div className="form-group">

                        <label>
                            PAN Number
                        </label>

                        <input
                            type="text"
                            name="panNumber"
                            value={form.panNumber}
                            onChange={onChange}
                        />

                    </div>


                    <div className="form-group">

                        <label>
                            Aadhaar Number
                        </label>

                        <input
                            type="text"
                            name="aadhaarNumber"
                            value={form.aadhaarNumber}
                            onChange={onChange}
                        />

                    </div>


                    <div className="form-group">

                        <label>
                            Occupation
                        </label>

                        <input
                            type="text"
                            name="occupation"
                            value={form.occupation}
                            onChange={onChange}
                        />

                    </div>


                    <div className="form-group">

                        <label>
                            Annual Income
                        </label>

                        <input
                            type="number"
                            name="annualIncome"
                            value={form.annualIncome}
                            onChange={onChange}
                            min="0"
                        />

                    </div>

                </div>

            </section>


            {/* ================================= */}
            {/* ADDRESS */}
            {/* ================================= */}

            <section className="form-section">

                <h2>
                    Address Information
                </h2>

                <div className="form-grid">

                    <div className="form-group form-group-full">

                        <label>
                            Address
                        </label>

                        <textarea
                            name="address"
                            value={form.address}
                            onChange={onChange}
                            rows="3"
                        />

                    </div>


                    <div className="form-group">

                        <label>
                            City
                        </label>

                        <input
                            type="text"
                            name="city"
                            value={form.city}
                            onChange={onChange}
                        />

                    </div>


                    <div className="form-group">

                        <label>
                            State
                        </label>

                        <input
                            type="text"
                            name="state"
                            value={form.state}
                            onChange={onChange}
                        />

                    </div>


                    <div className="form-group">

                        <label>
                            Country
                        </label>

                        <input
                            type="text"
                            name="country"
                            value={form.country}
                            onChange={onChange}
                        />

                    </div>


                    <div className="form-group">

                        <label>
                            Postal Code
                        </label>

                        <input
                            type="text"
                            name="postalCode"
                            value={form.postalCode}
                            onChange={onChange}
                        />

                    </div>

                </div>

            </section>


            {/* ================================= */}
            {/* DOCUMENT */}
            {/* ================================= */}

            <section className="form-section">

                <h2>
                    Customer Document
                </h2>

                {isEditMode &&
                    existingDocument?.path && (

                    <div className="existing-document">

                        <div>

                            <strong>
                                Existing document
                            </strong>

                            <p>
                                {
                                    existingDocument.name
                                }
                            </p>

                        </div>

                        <a
                            href={
                                getCustomerFileUrl(
                                    existingDocument.path
                                )
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="document-view-button"
                        >
                            View PDF
                        </a>

                    </div>

                )}


                <FileUpload
                    type="pdf"
                    selectedFile={document}
                    onFileChange={
                        onDocumentChange
                    }
                />

            </section>


            {/* ================================= */}
            {/* ACTIONS */}
            {/* ================================= */}

            <div className="customer-form-actions">

                <button
                    type="button"
                    className="cancel-button"
                    onClick={onCancel}
                    disabled={saving}
                >
                    Cancel
                </button>


                <button
                    type="submit"
                    className="save-button"
                    disabled={saving}
                >
                    {
                        saving
                            ? "Saving..."
                            : isEditMode
                                ? "Update Customer"
                                : "Save Customer"
                    }
                </button>

            </div>

        </form>

    );

}

export default CustomerForm;
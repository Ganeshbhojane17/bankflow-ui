import { useEffect, useState } from "react";

import { getCustomerFileUrl } from "../../../utils/fileUrl";

function FileUpload({
    type,
    selectedFile,
    existingFile,
    onFileChange
}) {

    const [previewUrl, setPreviewUrl] =
        useState(null);


    const isImage =
        type === "image";

    const isPdf =
        type === "pdf";


    // ==========================================
    // Create image preview
    // ==========================================

    useEffect(() => {

        if (!selectedFile) {

            setPreviewUrl(null);

            return;

        }

        const url =
            URL.createObjectURL(
                selectedFile
            );

        setPreviewUrl(url);


        return () => {

            URL.revokeObjectURL(url);

        };

    }, [selectedFile]);


    const handleChange = (event) => {

        const file =
            event.target.files?.[0];

        if (!file)
            return;

        onFileChange(file);

    };


    return (

        <div className="file-upload">


            {/* ================================= */}
            {/* IMAGE PREVIEW */}
            {/* ================================= */}

            {isImage && (

                <div className="profile-upload">

                    <div className="profile-preview">

                        {previewUrl ? (

                            <img
                                src={previewUrl}
                                alt="Selected profile"
                            />

                        ) : existingFile ? (

                            <img
                                src={
                                    getCustomerFileUrl(
                                        existingFile
                                    )
                                }
                                alt="Customer profile"
                            />

                        ) : (

                            <div className="profile-placeholder">
                                👤
                            </div>

                        )}

                    </div>

                </div>

            )}


            {/* ================================= */}
            {/* FILE INPUT */}
            {/* ================================= */}

            <div className="file-input-area">

                <label>

                    {
                        isImage
                            ? "Profile Image"
                            : "Customer Document"
                    }

                </label>


                <input
                    type="file"
                    accept={
                        isImage
                            ? "image/png,image/jpeg,image/jpg"
                            : "application/pdf"
                    }
                    onChange={handleChange}
                />


                <small>

                    {
                        isImage
                            ? "JPG or PNG. Maximum size according to server validation."
                            : "PDF files only."
                    }

                </small>


                {selectedFile && (

                    <div className="selected-file">

                        Selected:
                        {" "}
                        {selectedFile.name}

                    </div>

                )}

            </div>

        </div>

    );

}

export default FileUpload;
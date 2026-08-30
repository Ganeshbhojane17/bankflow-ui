import { useState } from "react";
import { getCustomerFileUrl } from "../../utils/fileUrl";

function ProfileImage({ path, name }) {

    const [hasError, setHasError] = useState(false);

    if (!path || hasError) {
        return (
            <div className="customer-profile-placeholder">
                👤
            </div>
        );
    }

    return (
        <img
            src={getCustomerFileUrl(path)}
            alt={name}
            className="customer-profile-image"
            onError={() => setHasError(true)}
        />
    );
}

export default ProfileImage;
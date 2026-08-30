const CUSTOMER_API_URL = "https://localhost:7087";

export const getCustomerFileUrl = (path) => {

    if (!path) {
        return null;
    }

    return `${CUSTOMER_API_URL}/${path}`;
};
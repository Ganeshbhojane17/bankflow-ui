const CUSTOMER_API_URL = import.meta.env.VITE_CUSTOMER_API_URL;

export const getCustomerFileUrl = (path) => {
    if (!path) {
        return null;
    }

    const cleanPath = path.startsWith("/")
        ? path
        : `/${path}`;

    return `${CUSTOMER_API_URL.replace("/api", "")}${cleanPath}`;
};
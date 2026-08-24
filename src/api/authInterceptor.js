import tokenStorage from "../utils/tokenStorage";

const publicEndpoints = [
    "/Auth/login",
    "/Auth/register",
    "/Auth/refresh-token"
];

export const attachAccessToken = (client) => {

    client.interceptors.request.use(
        (config) => {

            const isPublicEndpoint =
                publicEndpoints.some(endpoint =>
                    config.url
                        ?.toLowerCase()
                        .includes(endpoint.toLowerCase())
                );

            if (isPublicEndpoint) {
                return config;
            }

            const token =
                tokenStorage.getAccessToken();

            if (token) {

                config.headers =
                    config.headers || {};

                config.headers.Authorization =
                    `Bearer ${token}`;
            }

            return config;
        },

        (error) => Promise.reject(error)
    );

    return client;
};
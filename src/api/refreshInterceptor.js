import tokenStorage from "../utils/tokenStorage";
let isRefreshing = false;
let pendingRequests = [];

const processQueue = (error, token = null) => {

    pendingRequests.forEach(
        ({ resolve, reject }) => {

            if (error) {
                reject(error);
            }
            else {
                resolve(token);
            }
        }
    );

    pendingRequests = [];
};

export const attachRefreshInterceptor = (
    client,
    identityClient
) => {

    client.interceptors.response.use(

        response => response,

        async error => {

            const originalRequest = error.config;
            // Only handle 401
            if (
                error.response?.status !== 401 ||
                originalRequest?._retry
            ) {
                return Promise.reject(error);
            }

            originalRequest._retry = true;

            const refreshToken = tokenStorage.getRefreshToken();

            if (!refreshToken) {

                tokenStorage.clear();

                return Promise.reject(error);
            }

            // Another request is already refreshing
            if (isRefreshing) {

                return new Promise(
                    (resolve, reject) => {

                        pendingRequests.push({
                            resolve,
                            reject
                        });
                    }
                )
                .then(newAccessToken => {

                    originalRequest.headers =
                        originalRequest.headers || {};

                    originalRequest.headers.Authorization =
                        `Bearer ${newAccessToken}`;

                    return client(originalRequest);
                });
            }

            isRefreshing = true;

            try {

                const response =
                    await identityClient.post(
                        "/Auth/refresh-token",
                        {
                            refreshToken
                        }
                    );

                const newAccessToken =
                    response.data.data.accessToken;

                const newRefreshToken =
                    response.data.data.refreshToken;

                tokenStorage.save(
                    newAccessToken,
                    newRefreshToken
                );

                processQueue(
                    null,
                    newAccessToken
                );

                originalRequest.headers =
                    originalRequest.headers || {};

                originalRequest.headers.Authorization =
                    `Bearer ${newAccessToken}`;

                return client(originalRequest);

            }
            catch (refreshError) {

                processQueue(
                    refreshError,
                    null
                );

                tokenStorage.clear();

                return Promise.reject(
                    refreshError
                );
            }
            finally {

                isRefreshing = false;
            }
        }
    );
};
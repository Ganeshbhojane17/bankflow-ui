const ACCESS_TOKEN = "accessToken";
const REFRESH_TOKEN = "refreshToken";

const tokenStorage = {

    save(accessToken, refreshToken) {
        localStorage.setItem(ACCESS_TOKEN, accessToken);
        localStorage.setItem(REFRESH_TOKEN, refreshToken);
    },

    getAccessToken() {
        return localStorage.getItem(ACCESS_TOKEN);
    },

    getRefreshToken() {
        return localStorage.getItem(REFRESH_TOKEN);
    },

    clear() {
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
    }
};

export default tokenStorage;
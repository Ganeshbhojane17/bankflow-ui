import { login, register } from "../authApi";
import { logout } from "../authApi";
import tokenStorage from "../../../utils/tokenStorage";

export const registerUser = async (userData) => {
    return await register(userData);
};

export const loginUser = async (loginData) => {
    return await login(loginData);
};

export const logoutUser = async () => {

    const refreshToken = tokenStorage.getRefreshToken();

    try {

        if (refreshToken) {

            await logout(refreshToken);

        }

    }
    catch (error) {

        console.log(error);

    }
    finally {

        tokenStorage.clear();

    }

};
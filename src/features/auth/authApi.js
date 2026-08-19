import { identityClient } from "../../api/axiosClient";

export const login = async (data) => {
  debugger
  const response = await identityClient.post(
    "/auth/login",
    data
  );

  return response.data;
};

export const register = async (data) => {
  const response = await identityClient.post(
    "/auth/register",
    data
  );

  return response.data;
};

export const logout = async (refreshToken) => {

    return await identityClient.post("/auth/logout", {
        refreshToken
    });

};

export const refreshToken = async (refreshToken) => {

    const response = await identityClient.post("/auth/refresh-token", {
        refreshToken
    });
    return response.data;
};
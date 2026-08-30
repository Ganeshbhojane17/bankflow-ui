import axios from "axios";
//import tokenStorage from "../utils/tokenStorage";
import { attachAccessToken } from "./authInterceptor";
import { attachRefreshInterceptor } from "./refreshInterceptor";

export const identityClient = axios.create({
    baseURL: import.meta.env.VITE_IDENTITY_API_URL,
    // headers: {
    //     "Content-Type": "application/json",
    // },
});

export const customerClient = axios.create({
    baseURL: import.meta.env.VITE_CUSTOMER_API_URL,
    // headers: {
    //     "Content-Type": "application/json",
    // },
});

attachAccessToken(identityClient);
attachAccessToken(customerClient);
attachRefreshInterceptor(customerClient, identityClient);


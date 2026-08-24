import { customerClient } from "./axiosClient";

export const getCustomers = async () => {

    const response = await customerClient.get(
        "/Customer"
    );

    return response.data;
};

export const getCustomerById = async (id) => {

    const response = await customerClient.get(
        `/Customer/${id}`
    );

    return response.data;
};

export const createCustomer = async (data) => {

    const response = await customerClient.post(
        "/Customer",
        data
    );

    return response.data;
};

export const updateCustomer = async (id, data) => {

    const response = await customerClient.put(
        `/Customer/${id}`,
        data
    );

    return response.data;
};

export const deleteCustomer = async (id) => {

    const response = await customerClient.delete(
        `/Customer/${id}`
    );

    return response.data;
};
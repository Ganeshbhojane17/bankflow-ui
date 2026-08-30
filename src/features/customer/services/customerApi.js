import { customerClient } from "../../../api/axiosClient";

export const getCustomers = async (params = {}) => {

    const response = await customerClient.get(
        "/Customer",
        {
            params
        }
    );

    return response.data;
};


export const getCustomerById = async (id) => {
debugger
    const response = await customerClient.get(
        `/Customer/${id}`
    );

    return response.data;
};


export const createCustomer = async (formData) => {

    const response = await customerClient.post(
        "/Customer",
        formData
    );

    return response.data;
};


export const updateCustomer = async (id, formData) => {

    const response = await customerClient.put(
        `/Customer/${id}`,
        formData
    );

    return response.data;
};


export const deleteCustomer = async (id) => {

    const response = await customerClient.delete(
        `/Customer/${id}`
    );

    return response.data;
};
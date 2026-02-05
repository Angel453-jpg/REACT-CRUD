import axios from "axios";

const baseUrl = 'http://localhost:8080/api/products';

export const findAll = async () => {

    try {
        return await axios.get(baseUrl);
    } catch (error) {
        console.error(error);
    }

    return [];

}
export const create = async ({name, description, price}) => {

    try {
        return await axios.post(baseUrl, {name, description, price});
    } catch (error) {
        throw error.response;
    }
};
export const update = async ({id, name, description, price}) => {

    try {
        return await axios.put(`${baseUrl}/${id}`, {name, description, price});
    } catch (error) {
        throw error.response;
    }
};

export const remove = async (id) => {

    try {
        return await axios.delete(`${baseUrl}/${id}`);
    } catch (error) {
        console.error(error);
    }
    return undefined;

}
import axios from 'axios';

const url = 'https://ircbackend.herokuapp.com/api/courses';

export const create = async formData => {
    const res = await axios.post(`${url}/create`, formData);
    return res;
}

export const index = async () => {
    const res = await axios.get(`${url}`);
    return res;
}

export const getCourse = async _id => {
    const res = await axios.get(`${url}/course/${_id}`);
    return res;
}

export const update = async (_id, formData) => {
    const res = await axios.put(`${url}/course/${_id}/update`, formData);
    return res;
}

export const remove = async (_id) => {
    const res = await axios.delete(`${url}/create/${_id}`);
    return res;
}

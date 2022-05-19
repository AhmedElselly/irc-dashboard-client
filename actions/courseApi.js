import axios from 'axios';

// const url = 'https://ircbackend.herokuapp.com/api/courses';
// const url = 'http://localhost:8000/api/courses';
const url = 'http://64.227.74.120/api/courses';

export const create = async (formData, userId) => {
    const res = await axios.post(`${url}/create/${userId}`, formData);
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

export const update = async (_id, formData, userId) => {
    const res = await axios.put(`${url}/course/${_id}/update/${userId}`, formData);
    return res;
}

export const remove = async (_id, userId) => {
    const res = await axios.delete(`${url}/course/${_id}/remove/${userId}`);
    return res;
}

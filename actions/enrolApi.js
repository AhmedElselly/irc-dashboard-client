import axios from 'axios';

const url = 'https://ircbackend.herokuapp.com/api/enrollments';

export const create = async (courseId, userId, email) => {
    const res = await axios.post(`${url}/new/${courseId}/${userId}`, {email});
    return res;
}

export const read = async (courseId, userId) => {
    const res = await axios.get(`${url}/read/${courseId}/${userId}`);
    return res;
}
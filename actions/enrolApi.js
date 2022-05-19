import axios from 'axios';

// const url = 'https://ircbackend.herokuapp.com/api/enrollments';
const url = 'http://localhost:8000/api/enrollments';

export const create = async (courseId, userId, email) => {
    const res = await axios.post(`${url}/new/${courseId}/${userId}`, {email});
    return res;
}

export const read = async (courseId, userId) => {
    const res = await axios.get(`${url}/read/${courseId}/${userId}`);
    return res;
}

export const listByStudent = async (userId) => {
    const res = await axios.get(`${url}/learn-list/${userId}`);
    return res;
}

export const removeStudentEnrol = async (userId, enrolId) => {
    const res = await axios.delete(`${url}/remove/${userId}/${enrolId}`);
    return res;
}
import axios from 'axios';

// const url = 'https://ircbackend.herokuapp.com';
const url = 'http://localhost:8000';

export const create = async data => {
    const res = await axios.post(`${url}/api/posts/create`, {data});

    return res;
}

export const getPost = async postId => {
    const res = await axios.get(`${url}/api/posts/post/${postId}`);
    return res;
}

export const getPosts = async () => {
    const res = await axios.get(`${url}/api/posts/`);
    return res;
}

export const getStudentPosts = async userId => {
    const res = await axios.get(`${url}/api/posts/post/${userId}/assignments`);
    return res;
}
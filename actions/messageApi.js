import axios from 'axios';

// const url = 'https://ircbackend.herokuapp.com/api/messages';
// const url = 'http://localhost:8000/api/messages';
const url = '64.227.74.120/api/messages';

export const index = async () => {
    const res = await axios.get(`${url}`);
    return res;
}

export const create = async (email, name, text) => {
    console.log(email, name, text)
    const res = await axios.post(`${url}/create`, {
        email,
        name,
        text
    });
    return res;
}

export const getUnreadMessages = async () => {
    const res = await axios.get(`${url}/unread`);
    return res;
}

export const updateMessage = async (_id, read) => {
    // console.log('read', read)
    const res = await axios.put(`${url}/${_id}/update`, {
        read
    });
    return res;
}
import axios from 'axios';
import cookie from 'js-cookie';

// const url = 'https://ircbackend.herokuapp.com';
// const url = 'http://localhost:8000';
const url = '64.227.74.120:8000';

export const login = async (email, password) => {
    const res = await axios.post(`${url}/api/users/login`, {
        email,
        password
    });
    return res;
}

export const signup = async (email, name, password) => {
    const res = await axios.post(`${url}/api/users/register`, {
        email,
        name,
        password
    });
    return res;
}

export const addNewUser = async (formData, userId) => {
    const res = await axios.post(`${url}/api/users/add-new-user/${userId}`, formData);
    return res;
}

export const updateUser = async (_id, formData, userId) => {
    const res = await axios.put(`${url}/api/users/student/${_id}/edit/${userId}`, formData);
    return res;
}

export const changePassword = async (userId, oldPassword, newPassword) => {
    const res = await axios.put(`${url}/api/users/user/change-password/${userId}`, {
        oldPassword,
        newPassword
    });
    return res;
}

export const getUsers = async () => {
    const res = await axios.get(`${url}/api/users`);
    return res;
}

export const getStudents = async () => {
    const res = await axios.get(`${url}/api/users/students`);
    return res;
}

export const getSchools = async () => {
    const res = await axios.get(`${url}/api/users/schools`);
    return res;
}

export const getStudent = async (_id) => {
    const res = await axios.get(`${url}/api/users/student/${_id}`);
    return res;
}

export const getUserStatuses = async () => {
    const res = await axios.get(`${url}/api/users/statuses`);
    return res;
}

export const updateUserStatuses = async (_id, status, userId) => {
    const res = await axios.put(`${url}/api/users/statuses/${_id}/update/${userId}`, {
        status
    });
    return res;
}

export const putForgotPassword = async email => {
    const res = await axios.put(`${url}/api/users/user/forgot-password`, {
        email
    });
    return res;
}

export const resetPassword = async (password, token) => {
    const res = await axios.put(`${url}/api/users/user/reset/${token}`, {
        password
    });
    return res;
}

export const removeUser = async (_id, userId) => {
    const res = await axios.delete(`${url}/api/users/statuses/${_id}/remove/${userId}`);
    return res;
}

export const setCookie = async token => {
    if(process.browser){
        cookie.set('user', JSON.stringify(token));    
    }    
}


export const getCookie = () => {
    if(process.browser){
        return cookie.get('user');
    }
}

export const removeCookie = key => {
    if(process.browser){
        cookie.remove(key);
    }
}

export const authenticate = async (token, next) => {
    if(process.browser){
        localStorage.setItem('token', JSON.stringify(token));
        setCookie(token);
        next();
    }
}

export const isAuthenticated = (token, next) => {
    if(process.browser){
        if(localStorage.getItem('token')){
            return JSON.parse(localStorage.getItem('token'));
        }
    }
    return undefined;
}


export const logout = async (next) => {
	if(localStorage.getItem('token')){
		removeCookie('user');
		localStorage.removeItem('token');
	}

	next();
	
}
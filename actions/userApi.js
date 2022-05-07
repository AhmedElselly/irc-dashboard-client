import axios from 'axios';
import cookie from 'js-cookie';

const url = 'https://ircbackend.herokuapp.com';

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

export const addNewUser = async (formData) => {
    const res = await axios.post(`${url}/api/users/add-new-user`, formData);
    return res;
}

export const updateUser = async (_id, formData) => {
    const res = await axios.put(`${url}/api/users/student/${_id}/edit`, formData);
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

export const updateUserStatuses = async (_id, status) => {
    const res = await axios.put(`${url}/api/users/statuses/${_id}`, {
        status
    });
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
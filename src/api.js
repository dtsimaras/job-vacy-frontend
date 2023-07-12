import axios from 'axios';

export const apiLogin = axios.create({baseURL:'http://localhost:4000/api/v1/auth/login'});

export const createApi = (token) => {
    token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBlbWFpbC5jb20iLCJpYXQiOjE2ODkxNTkwNzEsImV4cCI6MTY4OTI0NTQ3MX0.omwU1f9dF9IxiP_rmrdPZvC0C8FIPojtY0T5Ot0qVcc'
    const api = axios.create({baseURL:'http://localhost:4000/api/v1', headers: {'Authorization': `Bearer ${token}`}});
    return api;
}
import axios from 'axios';

export const apiLogin = axios.create({baseURL:'http://localhost:4000/api/v1/auth/login'});

export const createApi = (token) => {
    token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBlbWFpbC5jb20iLCJpYXQiOjE2ODkxNzE1NDgsImV4cCI6MTY4OTI1Nzk0OH0.Z0zybLnOlAJMmyyvZeJs6uevdAoSRaIxJ2Dcz_Zbyi4'
    const api = axios.create({baseURL:'http://localhost:4000/api/v1', headers: {'Authorization': `Bearer ${token}`}});
    return api;
}
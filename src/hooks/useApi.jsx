import { useState, useContext } from 'react';
import axios from "axios";

import ApplicationContext from '../components/context/ApplicationContext';

function useApi() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { jwt } = useContext(ApplicationContext);

    const api = axios.create({
        baseURL: "http://localhost:4000/api/v1/",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
        },
    });

    const get = async (url) => {
        try {
            setLoading(true);
            setError(null);
            const response = await api.get(url);
            return response;
        } catch (error) {
            setError(error);
            throw(error);
        } finally {
            setLoading(false);
        }
    };

    const post = async (url, data) => {
        try {
            setLoading(true);
            setError(null);
            const response = await api.post(url, data);
            return response;
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    return { api, loading, error, get, post }
}


export default useApi;

import axios from 'axios';
import { getValue } from '../storage/storage';

const BASE_URL = 'https://prime-shippa-api.point-dev.net/api/';

const axiosInstance = axios.create({
        baseURL: BASE_URL,
        headers: {
                'Content-Type': 'application/json',
                'Content-Type': 'multipart/form-data',
        },
});

axiosInstance.interceptors.request.use(
        (config) => {
                const token = getValue('token');
                if (token) {
                        config.headers['Authorization'] = `Bearer ${token}`;
                }
                return config;
        },
        (error) => {
                return Promise.reject(error);
        }
);

export default axiosInstance;

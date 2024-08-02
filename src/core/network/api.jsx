import axios from 'axios';
import { getValue } from '../storage/storage';

const BASE_URL = 'https://taxiapp.easybooks.me:8283/';

const axiosInstance = axios.create({
        baseURL: BASE_URL,
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

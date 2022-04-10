import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
    headers: { 'Content-Type': 'application/json' }
});

apiClient.interceptors.request.use(
    function (config) {
        var token = localStorage.getItem('token');
        config.headers.Authorization = token ? `Token ${token}` : '';
        return config;
    }
);

export default apiClient;

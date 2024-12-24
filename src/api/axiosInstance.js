// src/api/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: '/api', // Base URL 설정
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json', //추가됨..
    },
});

// Request interceptor to add JWT token to headers
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('jwtToken'); // 로컬 스토리지에서 토큰 가져오기
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // 토큰 추가
        }
        return config;
    },
    (error) => {
        return Promise.reject(error); // 요청 에러 처리
    }
);

export default axiosInstance;

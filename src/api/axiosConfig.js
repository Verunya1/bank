import axios from 'axios';
import { getAuthToken } from '../utils/Auth';


const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/vBank',
});

axiosInstance.interceptors.request.use(config => {
    const token = getAuthToken();
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

// export const getAuthToken = () => {
//     return window.localStorage.getItem('auth_token');
// };
//
// const axiosInstance = axios.create({
//     baseURL: 'http://localhost:8080/vBank',
// });
//
// axiosInstance.interceptors.request.use(config => {
//     const token = getAuthToken();
//     if (token) {
//         config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     return config;
// }, error => {
//     return Promise.reject(error);
// });

// export const setAuthHeader = (token) => {
//     if (token !== null) {
//         window.localStorage.setItem("auth_token", token);
//     } else {
//         window.localStorage.removeItem("auth_token");
//     }
// };
// export default axios.create({
//     // baseURL: 'http://localhost:3000',
//     // baseURL: 'http://localhost:3000/vBank',
//     baseURL: 'http://localhost:8080/vBank',
//     headers: {"ngrok-skip-browser-warning": true, 'Content-Type': 'application/json'}
//     // headers:{'authorization', `Bearer ${token}`}
//     // axios.defaults.headers.post['Content-Type'] = 'application/json';
// })

// axios.defaults.baseURL='http://localhost:8080/vBank'
// export const request = (method, url, data) => {
//
//     // let headers = {};
//     // if (getAuthToken() !== null && getAuthToken() !== "null") {
//     //     headers = {'Authorization': `Bearer ${getAuthToken()}`};
//     // }
//
//     return axios({
//         method: method,
//         url: url,
//         // headers: headers,
//         data: data
//     });
// };
export default axiosInstance;
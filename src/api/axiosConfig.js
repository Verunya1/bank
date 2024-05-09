import axios from 'axios';

export default axios.create({
    // baseURL: 'http://localhost:3000',
    // baseURL: 'http://localhost:3000/vBank',
    baseURL: 'http://localhost:8080/vBank',
    headers:{"ngrok-skip-browser-warning":true }
    // headers:{'authorization', `Bearer ${token}`}
    // headers:('Content-Type', 'application/json')
})
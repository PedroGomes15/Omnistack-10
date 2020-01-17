import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:1406'
})

export default api
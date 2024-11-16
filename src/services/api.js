import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api-cadastro-usuarios-53nf.onrender.com/'
})

export default api;

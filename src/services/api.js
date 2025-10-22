import axios from 'axios';

const api = axios.create({
    baseURL: 'cadastro-usuarios-new.vercel.app/usuarios'
})

export default api;

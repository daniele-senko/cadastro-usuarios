import axios from 'axios';

const api = axios.create({
    baseURL: 'https://noon-bubble-pudding.glitch.me'
})

export default api;

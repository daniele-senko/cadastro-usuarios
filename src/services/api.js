import axios from "axios";

const api = axios.create({
  baseURL: "https://cadastro-usuarios-new.vercel.app/api/usuarios",
});

export default api;

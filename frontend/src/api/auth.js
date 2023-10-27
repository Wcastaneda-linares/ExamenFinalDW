import axios from "./axios.js";

// Registro de un usuario
export const registerRequest = async (user) => axios.post(`api/users/register`, user);

// Iniciar sesión
export const loginRequest = async (user) => axios.post(`api/users/login`, user);

// Verificar token

export const verifyTokenRequest = async () => axios.get(`api/users/verify`);

// Obtener todos los usuarios
export const getAllUsersRequest = async () => axios.get(`api/users/user`);

// Cerrar sesión
export const logoutRequest = async () => axios.post(`api/users/logout`);
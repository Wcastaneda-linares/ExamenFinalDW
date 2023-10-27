//src/config/config.js

import process from 'process';

//Define las variables de entorno para la aplicación
export const PORT = process && process.env.PORT || 3000;
export const MONGODB_URI =
    process && process.env.MONGODB_URI || "mongodb://wlinares:12345678@mongo:27017/users?authSource=admin";
export const TOKEN_SECRET = process && process.env.TOKEN_SECRET || "secret";
export const FRONTEND_URL = process && process.env.FRONTEND_URL || "http://localhost:5173";


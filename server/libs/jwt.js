import { TOKEN_SECRET } from "../config/db.js";
import jwt from "jsonwebtoken";

// Crea un token de acceso con un tiempo de expiración de 1 día
export async function createAccessToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, TOKEN_SECRET, { expiresIn: "1d" }, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
}
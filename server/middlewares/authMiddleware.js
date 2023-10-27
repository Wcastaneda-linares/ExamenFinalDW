//server/middlewares/authMiddleware.js
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from "../config/db.js";
import process from 'dotenv';

// Middleware para autenticar el usuario a través de una cookie con un token
export const auth = (req, res, next) => {
    try {
      const { token } = req.cookies;
  
      if (!token)
        return res
          .status(401)
          .json({ message: "No existe token, autorizacion denegada" });
  
      jwt.verify(token, TOKEN_SECRET, (error, user) => {
        if (error) {
          return res.status(401).json({ message: "Token no valido" });
        }
        req.user = user;
        next();
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

// Middleware que exige un token en el encabezado de la solicitud para autenticar al usuario
export const authRequire = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    console.log("Token recibido:", token);


    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid.' });
    }
};

// Middleware que autentica al usuario basándose en un token que se encuentra en el encabezado "Authorization"
export const authentication = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (!token) return res.sendStatus(401);  // Sin token
  
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);  // Token no válido
      req.user = user;
      next();  // Pasa al siguiente middleware o ruta
    });
  };

// Middleware para validar la estructura del cuerpo de la solicitud según un esquema definido
  export const validateSchema = (schema) => (req, res, next) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      return res
        .status(400)
        .json(error.errors.map((error) => error.message));
    }
  };


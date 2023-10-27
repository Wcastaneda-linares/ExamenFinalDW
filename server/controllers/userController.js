//server/controllers/userController.js
import User from '../models/mongo/User.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from "bcrypt";
import { createAccessToken } from '../libs/jwt.js';
import { TOKEN_SECRET } from '../config/config.js';

dotenv.config(); // Carga las variables de entorno desde el archivo .env

// Controlador para iniciar sesión en la aplicación
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userFound = await User.findOne({ email });

    if (!userFound)
      return res.status(400).json({
    message: ["El correo no está registrado"],
  });

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) 
      return res.status(400).json({
        message: ["La contraseña no es correcta"],
      });
    

    const token = await createAccessToken({
      id: userFound._id,
      username: userFound.username,
    });

    res.cookie("token", token, {
    });

    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


// Controlador para obtener todos los usuarios
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find(); // Usa el método `find` de Mongoose para obtener todos los usuarios
    res.json(users); // Devuelve la lista de usuarios en formato JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener usuarios' });
  }
};

// re
export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const userFoundByEmail = await User.findOne({ email });
    const userFoundByUsername = await User.findOne({ username });

    if (userFoundByEmail)
      return res.status(400).json({
        message: ["Este correo ya está registrado"],
      });

    if (userFoundByUsername)
      return res.status(400).json({
        message: ["Este nombre de usuario ya está registrado"],
      });

    // contraseña hasheada
    const passwordHash = await bcrypt.hash(password, 10);

    // creando un nuevo usuario
    const newUser = new User({
      username,
      email,
      password: passwordHash,
    });

    // guardando el nuevo usuario
    const userSaved = await newUser.save();

    // creando el token de acceso
    const token = await createAccessToken({
      id: userSaved._id,
    });

    res.cookie("token", token, {
      httpOnly: process.env.NODE_ENV !== "development",
      secure: true,
      sameSite: "none",
    });

    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Controlador para verificar el token de acceso
export const verifyToken = async (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.send(false);

  jwt.verify(token, TOKEN_SECRET, async (error, user) => {
    if (error) return res.sendStatus(401);

    const userFound = await User.findById(user.id);
    if (!userFound) return res.sendStatus(401);

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });
  });
};

// Controlador para cerrar sesión
export const logout = async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: true,
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

// Controlador para obtener el perfil del usuario
export const profile = async (req, res) => {
  const userFound = await User.findById(req.user.id)
  if (!userFound) return res.sendStatus(400).json({ message: "User not found" });
  return res.json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email,
  });
};

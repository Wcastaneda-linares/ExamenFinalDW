import { z } from "zod";

// Esquema de validación para los datos de inicio de sesión
export const loginSchema = z.object({
  email: z.string().email({
    message: "Por favor, introduce una dirección de correo electrónico válida",
  }),
  password: z.string().min(8, {
    message: "La contraseña debe tener al menos 8 caracteres",
  }),
});

// Esquema de validación para los datos de registro
export const registerSchema = z
  .object({
    username: z
      .string({
        required_error: "El usuario es requerido",
      })
      .min(3, {
        message: "El usuario debe tener al menos 3 caracteres",
      }),
    email: z.string().email({
      message: "Por favor, introduce una dirección de correo electrónico válida",
    }),
    password: z.string().min(8, {
      message: "La contraseña debe tener al menos 8 caracteres",
    }),
    confirmPassword: z.string().min(8, {
      message: "La contraseña debe tener al menos 8 caracteres",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

  export const validateSchema = (schema) => (req, res, next) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      return res
        .status(400)
        .json({ message: error.errors.map((error) => error.message) });
    }
  };

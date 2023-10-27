import React  from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '../schemas/userSchema.js';
import { useAuth } from '../components/AuthComponents.jsx';
import { useEffect } from 'react';
import { Card, Message, Button, Input, Label } from '../components/ui';

// pagina para registrar un usuario en la aplicacion
function Register() {
  const { signup, errors: registerErrors, isAuthenticated } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });
  const navigate = useNavigate();

  const onSubmit = async (value) => {
    await signup(value);
  };

  //si el usuario esta autenticado se redirige a la pagina de perfil
  useEffect(() => {
    if (isAuthenticated) navigate("/profile");
  }, [isAuthenticated]);

  //retorna el formulario para registrar un usuario
  return (
    <div className="h-[calc(100vh-100px)] flex items-center justify-center">
      <Card>
        {registerErrors.map((error, i) => (
          <Message message={error} key={i} />
        ))}
        <h1 className="text-2xl font-semibold mb-4 text-center text-white">Registrate</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Label htmlFor="username">Usuario:</Label>
          <Input
          id="username"
            type="text"
            name="username"
            placeholder="nombre de usuario..."
            autoComplete="off"
            {...register("username")}

            autoFocus
          />
          {errors.username?.message && (
            <p className="text-red-500">{errors.username?.message}</p>
          )}

          <Label htmlFor="email">Correo Electrónico:</Label>
          <Input
          id="email"
            name="email"
            placeholder="correo electrónico..."
            autoComplete="off"
            {...register("email")}
          />
          {errors.email?.message && (
            <p className="text-red-500">{errors.email?.message}</p>
          )}

          <Label htmlFor="password">Contraseña:</Label>
          <Input
          id="password"
            type="password"
            name="password"
            placeholder="********"
            {...register("password")}
          />
          {errors.password?.message && (
            <p className="text-red-500">{errors.password?.message}</p>
          )}

          <Label htmlFor="confirmPassword">Confirma tu contraseña:</Label>
          <Input
          id="confirmPassword"
            type="password"
            name="confirmPassword"
            placeholder="********"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword?.message && (
            <p className="text-red-500">{errors.confirmPassword?.message}</p>
          )}
          <div className="flex justify-center text-white">
            <Button className="text-white">Registrarme</Button>
          </div>
        </form>
        <p>
          Ya tengo una cuenta?   
          <Link className="ml-2 text-white" to="/login">
              Iniciar Sesión
          </Link>
        </p>
      </Card>
    </div>
  );
}

export default Register;

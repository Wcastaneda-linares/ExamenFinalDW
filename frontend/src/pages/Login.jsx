import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../components/AuthComponents.jsx";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CardLogin, Message, Button, Input, Label } from "../components/ui";
import { loginSchema } from "../schemas/userSchema.js";

// pagina para iniciar sesion en la aplicacion
function Login() {
  
  //se utiliza el hook useForm para validar los datos del formulario
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const { signin, errors: loginErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const onSubmit = (data) => signin(data);

  //si el usuario esta autenticado se redirige a la pagina de perfil
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/profile");
    }
  }, [isAuthenticated]);

  //retorna el formulario para iniciar sesion
  return (
    <div className="h-[calc(100vh-100px)] flex items-center justify-center">
      <CardLogin>
        {loginErrors.map((error, i) => (
          <Message message={error} key={i} />
        ))}
        <h1 className="text-2xl font-semibold mb-4 text-center text-white">Iniciar Sesión</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Label htmlFor="email">Correo Electrónico:</Label>
          <Input
            id="email"
            label="Write your email"
            type="email"
            name="email"
            placeholder="correo@dominio.com..."
            autoComplete="off"
            {...register("email", { required: true })}
          />
          {errors.email?.message && (
            <p className="text-red-500">{errors.email?.message}</p>
          )}
          {/*<p className="text-xs block my-1 text-red-700">{errors.email?.message}</p>*/}

          <Label htmlFor="password">Contraseña:</Label>
          <Input
            id="password"
            type="password"
            name="password"
            placeholder="Escribe tu contraseña..."
            autoComplete="off"
            {...register("password", { required: true, minLength: 8 })}
          />
          <p className="text-xs block my-1 text-red-700">{errors.password?.message}</p>

          <div className="flex justify-center text-white">
            <Button className="text-white">Iniciar Sesión</Button>
          </div>

        </form>

        <p className="flex mt-4 ">
          No tienes cuenta? <Link to="/register" className="ml-2 text-white">Registrate</Link>
        </p>
      </CardLogin>
    </div>
  );
}

export default Login;

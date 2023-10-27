import { Link } from "react-router-dom";
import 'font-awesome/css/font-awesome.min.css';
import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from "../components/AuthComponents.jsx";
import { ButtonLink } from "./ui/ButtonLink.jsx";

// Componente de barra de navegación que se muestra en la parte superior de la aplicación.
export function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Cerrar el menú si se hace click fuera de él
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-emerald-800 flex justify-between py-5 px-10 relative">
        <h1 className="text-2xl font-bold text-gray-50">
            <Link to={isAuthenticated ? "/profile" : "/"}>SISTEMA DE CONTROL DE EXPEDIENTES MÉDICOS</Link>
        </h1>
        <ul className="flex gap-x-2">
            {isAuthenticated ? (
                <>
                    <li className="text-gray-50 mx-3">
                    <i ></i>
                        Bienvenido: {user.username}
                    </li>
                    <li><Link to="/profile" 
                    className="text-gray-50 mx-3">
                        Ver Perfil</Link></li>
                    <li><Link to="/profileForm" 
                      className="text-gray-50 mx-3">
                      Crear paciente
                      </Link></li>
                    <li className="text-gray-50 cursor-pointer mx-3 relative" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        Mi perfil <i className="fa fa-chevron-down"></i>
                        {isMenuOpen && (
                            <ul className="absolute left-0 mt-1 w-40 bg-emerald-800 text-gray-50 z-10" ref={dropdownRef}>
                                <li><Link to="/" onClick={() => logout()} className="block px-4 py-2 hover:bg-emerald-600">Cerrar Sesión</Link></li>
                            </ul>
                        )}
                    </li>
                </>
            ) : (
                <>
                    <li className="text-gray-50 mx-2">
                        <ButtonLink to="/login">Iniciar Sesión</ButtonLink>
                    </li>
                    <li className="text-gray-50 mx-2">
                        <ButtonLink to="/register">Registrarme</ButtonLink>
                    </li>
                </>
            )}
        </ul>
    </nav>
);
}

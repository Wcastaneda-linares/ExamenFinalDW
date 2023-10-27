//src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Home.css';

// Página de inicio de la aplicación.
function Home() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
        <img className="w-3/4 md:w-1/2 lg:w-1/3" src="/portada.jpg" alt="Descripción de la imagen" />
    </div>
);
}

export default Home;

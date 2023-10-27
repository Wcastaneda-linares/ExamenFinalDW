import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from "./components/Navbar";
import { AuthProvider } from "./components/AuthComponents.jsx";
import ProtectedRoute from "../src/schemas/routes.jsx";

import Home from '../src/pages/Home.jsx';
import Login from '../src/pages/Login.jsx';
import Profile from '../src/pages/Profile.jsx';
import Register from '../src/pages/Register.jsx';
import ProfileForm from '../src/pages/ProfileForm.jsx';
import './index.css';
import { PatientProvider } from './components/PatientsComponets.jsx';

// Componente principal de la aplicación que contiene las rutas de la aplicación y componentes de autenticación.
function App() {
  return (
    <AuthProvider>
      <PatientProvider>
        <BrowserRouter>
          <main className="container content-container mx-auto px-10 md:px-0">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
                <Route element={<ProtectedRoute />}>
                <Route path="/:id" element={<ProfileForm />} />
                <Route path="/profileForm" element={<ProfileForm />} />
                <Route path="/profile" element={<Profile />} />
              </Route>
            </Routes>
          </main>
        </BrowserRouter>
      </PatientProvider>
    </AuthProvider>
  );
}

export default App;

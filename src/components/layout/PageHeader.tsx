'use client';

/**
 * Componente PageHeader
 * Banner con título del catálogo de cursos UPC y botón Cerrar sesión
 * Obtiene el usuario desde la sesión (cookie) vía /api/auth/me
 */

import Image from "next/image";
import { useEffect, useState } from "react";
import { JSX } from "react";

interface AuthUser {
  authenticated: boolean;
  email?: string;
}

export function PageHeader(): JSX.Element {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => (res.ok ? res.json() : { authenticated: false }))
      .then(setUser)
      .catch(() => setUser({ authenticated: false }));
  }, []);

  const handleSignOut = () => {
    window.location.href = '/api/auth/logout';
  };

  return (
    <div className="w-full bg-red-700 py-2">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center relative">
        
        {/* Columna izquierda (solo visible en pantallas medianas en adelante) */}
        <div className="hidden md:block md:w-1/3 lg:block lg:w-1/3"></div>

        {/* Título centrado */}
        <h1 className="w-full md:w-1/3 lg:w-1/3 text-2xl md:text-3xl lg:text-4xl font-bold text-white text-center">
          CATÁLOGO DE CURSOS UPC
        </h1>

        {/* Imagen derecha + Cerrar sesión */}
        <div className="w-full md:w-1/3 flex justify-center md:justify-end items-center gap-4">
          <div className="relative w-24 h-10 md:w-32 md:h-8">
            <Image
              src="/assets/logo_upc.png"
              alt="Logo UPC"
              fill
              className="object-contain"
            />
          </div>
          {user?.authenticated && user?.email && (
            <div className="flex items-center gap-2">
              <span className="text-white/90 text-sm truncate max-w-[120px]">
                {user.email}
              </span>
              <button
                type="button"
                onClick={handleSignOut}
                className="px-3 py-1.5 text-sm font-medium text-red-700 bg-white rounded hover:bg-gray-100"
              >
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

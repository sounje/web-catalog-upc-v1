'use client';

/**
 * Componente PageHeader
 * Valida sesión con auth.isAuthenticated (igual que proyectoLoginTest)
 */

import Image from "next/image";
import { useAuth } from "react-oidc-context";
import { JSX } from "react";

export function PageHeader(): JSX.Element {
  const auth = useAuth();

  const handleSignOut = () => {
    const cognitoDomain =
      process.env.NEXT_PUBLIC_COGNITO_DOMAIN || process.env.REACT_APP_COGNITO_DOMAIN;
    const clientId =
      process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID || process.env.REACT_APP_COGNITO_CLIENT_ID;
    if (cognitoDomain && clientId) {
      const logoutUri = typeof window !== 'undefined' ? `${window.location.origin}/login` : '/login';
      window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
    } else {
      auth.removeUser();
    }
  };

  const email = auth.user?.profile?.email ?? auth.user?.profile?.name;

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
          {auth.isAuthenticated && (
            <div className="flex items-center gap-2">
              {email && (
                <span className="text-white/90 text-sm truncate max-w-[120px]">
                  {String(email)}
                </span>
              )}
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

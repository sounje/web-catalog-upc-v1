'use client';

import { useAuth } from 'react-oidc-context';

/**
 * Muestra "Cargando..." cuando auth está cargando (ej: procesando callback de Cognito)
 * Similar al patrón de proyectoLoginTest App.js
 */
export function AuthLoadingGate({ children }: { children: React.ReactNode }) {
  const auth = useAuth();

  if (auth.isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <div className="text-gray-600">Cargando...</div>
      </div>
    );
  }

  return <>{children}</>;
}

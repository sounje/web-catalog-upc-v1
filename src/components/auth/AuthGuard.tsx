'use client';

/**
 * Envuelve el contenido y muestra estados de autenticación:
 * - Loading, Error, No autenticado (Sign in), Autenticado (children)
 */

import { useAuth } from 'react-oidc-context';
import { JSX } from 'react';

export function AuthGuard({ children }: { children: React.ReactNode }): JSX.Element {
  const auth = useAuth();

  const handleSignOut = () => {
    const clientId = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID;
    const logoutUri = process.env.NEXT_PUBLIC_COGNITO_LOGOUT_URI;
    const cognitoDomain = process.env.NEXT_PUBLIC_COGNITO_DOMAIN;
    if (clientId && logoutUri && cognitoDomain) {
      window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
    } else {
      auth.removeUser();
    }
  };

  if (auth.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600">Cargando...</p>
      </div>
    );
  }

  if (auth.error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-6">
          <p className="text-red-600 mb-4">Error: {auth.error.message}</p>
          <button
            type="button"
            onClick={() => auth.signinRedirect()}
            className="px-4 py-2 bg-red-700 text-white rounded hover:bg-red-800"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  if (!auth.isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 gap-4">
        <p className="text-gray-600">Inicia sesión para acceder al catálogo</p>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => auth.signinRedirect()}
            className="px-4 py-2 bg-red-700 text-white rounded hover:bg-red-800"
          >
            Iniciar sesión
          </button>
          <button
            type="button"
            onClick={handleSignOut}
            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

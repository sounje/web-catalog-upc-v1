'use client';

import { useAuth } from 'react-oidc-context';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function LoginPage() {
  const auth = useAuth();
  const router = useRouter();

  // Redirigir si ya está autenticado (solo auth.isAuthenticated, igual que proyectoLoginTest)
  useEffect(() => {
    if (auth.isAuthenticated) router.push('/');
  }, [auth.isAuthenticated, router]);

  const handleSignIn = () => {
    auth.signinRedirect();
  };

  if (auth.isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <div className="text-gray-600">Cargando...</div>
      </div>
    );
  }

  if (auth.error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-md">
          <p className="text-red-700 font-medium">Error</p>
          <p className="text-red-600 text-sm mt-1">{auth.error.message}</p>
          <button
            type="button"
            onClick={() => auth.signinRedirect()}
            className="mt-3 px-4 py-2 bg-red-700 text-white rounded hover:bg-red-800 text-sm"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  if (auth.isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <div className="text-gray-600">Redirigiendo...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <div className="mb-6 flex justify-center">
          <Image
            src="/assets/logo_upc.png"
            alt="Logo UPC"
            width={120}
            height={48}
            className="object-contain"
          />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Catálogo de Cursos UPC
        </h1>
        <p className="text-gray-600 mb-6">
          Inicia sesión con tu cuenta institucional para acceder al catálogo
        </p>
        <button
          type="button"
          onClick={handleSignIn}
          className="w-full py-3 px-4 bg-red-700 text-white font-medium rounded-lg hover:bg-red-800 transition-colors"
        >
          Iniciar sesión con Office 365
        </button>
      </div>
    </div>
  );
}

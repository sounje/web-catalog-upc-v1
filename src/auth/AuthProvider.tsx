'use client';

/**
 * Cliente wrapper para AuthProvider de react-oidc-context.
 * Necesario en Next.js App Router porque el layout es Server Component por defecto.
 */

import { AuthProvider as OidcAuthProvider } from 'react-oidc-context';
import { authConfig } from './authConfig';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return <OidcAuthProvider {...authConfig}>{children}</OidcAuthProvider>;
}

'use client';

import { AuthProvider as OidcAuthProvider } from 'react-oidc-context';
import { authConfig } from '@/auth/authConfig';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return <OidcAuthProvider {...authConfig}>{children}</OidcAuthProvider>;
}

'use client';

import { useAuth } from 'react-oidc-context';
import { useEffect, useRef } from 'react';

/**
 * Sincroniza los tokens de react-oidc-context a la cookie cognito_session
 * para que el middleware pueda validar la sesión server-side
 */
export function AuthSync() {
  const auth = useAuth();
  const syncDoneRef = useRef(false);

  useEffect(() => {
    if (
      !auth.isAuthenticated ||
      !auth.user?.access_token ||
      !auth.user?.id_token ||
      syncDoneRef.current
    ) {
      return;
    }

    const expiresIn = auth.user.expires_in ?? 3600;

    fetch('/api/auth/sync-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_token: auth.user.access_token,
        id_token: auth.user.id_token,
        refresh_token: auth.user.refresh_token,
        expires_in: expiresIn,
      }),
    })
      .then((res) => {
        if (res.ok) {
          syncDoneRef.current = true;
        }
      })
      .catch(() => {});
  }, [auth.isAuthenticated, auth.user]);

  return null;
}

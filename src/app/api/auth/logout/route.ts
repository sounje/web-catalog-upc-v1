/**
 * API Route para cerrar sesión
 * Elimina la cookie cognito_session y redirige a Cognito logout (luego a /login)
 * o directamente a /login si no hay config de Cognito
 */

import { NextRequest, NextResponse } from 'next/server';

const COOKIE_NAME = 'cognito_session';

export async function GET(request: NextRequest) {
  const cognitoDomain =
    process.env.REACT_APP_COGNITO_DOMAIN || process.env.NEXT_PUBLIC_COGNITO_DOMAIN;
  const clientId =
    process.env.REACT_APP_COGNITO_CLIENT_ID || process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID;

  let redirectUrl: string;
  if (cognitoDomain && clientId) {
    const baseUrl = new URL(request.url).origin;
    const loginUrl = `${baseUrl}/login`;
    redirectUrl = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(loginUrl)}`;
  } else {
    redirectUrl = '/login';
  }

  const response = NextResponse.redirect(redirectUrl, 302);
  response.cookies.set(COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
    path: '/',
  });

  return response;
}

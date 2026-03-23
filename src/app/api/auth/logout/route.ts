/**
 * API Route para cerrar sesión
 * Elimina la cookie cognito_session y redirige al proyecto de login
 */

import { NextResponse } from 'next/server';

const COOKIE_NAME = 'cognito_session';

export async function GET() {
  const authRedirectUnauthorized =
    process.env.AUTH_REDIRECT_UNAUTHORIZED || 'http://localhost:3001/';

  const response = NextResponse.redirect(authRedirectUnauthorized, 302);
  response.cookies.set(COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
    path: '/',
  });

  return response;
}

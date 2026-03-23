/**
 * Middleware de validación de sesión Cognito
 * El login ocurre en otro proyecto; este solo valida que exista sesión activa.
 * - Si hay ?code= en URL: redirige a /api/auth/callback para intercambiar por tokens
 * - Si no hay code ni cookie de sesión: redirige al proyecto de login
 * - Si hay cookie de sesión: permite el acceso
 */

import { NextRequest, NextResponse } from 'next/server';

const COOKIE_NAME = 'cognito_session';
const AUTH_REDIRECT_UNAUTHORIZED =
  process.env.AUTH_REDIRECT_UNAUTHORIZED || 'http://localhost:3001/';

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // Excluir rutas estáticas y _next
  if (pathname.startsWith('/_next')) {
    return NextResponse.next();
  }

  // Excluir assets estáticos
  if (pathname.match(/\.(ico|png|jpg|jpeg|gif|svg|css|js|woff|woff2)$/)) {
    return NextResponse.next();
  }

  // Permitir /api/auth/callback (procesa el code)
  if (pathname === '/api/auth/callback') {
    return NextResponse.next();
  }

  // Permitir /api/auth/logout
  if (pathname === '/api/auth/logout') {
    return NextResponse.next();
  }

  // Excluir el resto de rutas API (courses, filter, period)
  if (pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  // Si hay code en la URL: redirigir al callback para intercambiar por tokens
  const code = searchParams.get('code');
  if (code) {
    const callbackUrl = new URL('/api/auth/callback', request.url);
    callbackUrl.searchParams.set('code', code);
    const state = searchParams.get('state');
    if (state) {
      callbackUrl.searchParams.set('state', state);
    }
    return NextResponse.redirect(callbackUrl);
  }

  // Sin code: verificar cookie de sesión
  const sessionCookie = request.cookies.get(COOKIE_NAME);
  if (!sessionCookie?.value) {
    return NextResponse.redirect(AUTH_REDIRECT_UNAUTHORIZED);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};

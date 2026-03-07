/**
 * Middleware de autenticación Cognito
 * Primera validación en cada request: intercepta code de URL o verifica cookie de sesión
 */

import { NextRequest, NextResponse } from 'next/server';

const COOKIE_NAME = 'cognito_session';
const AUTH_REDIRECT_UNAUTHORIZED =
  process.env.AUTH_REDIRECT_UNAUTHORIZED || 'http://localhost:3001/';

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // Excluir rutas estáticas, _next y api (excepto auth/callback que manejamos)
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api/') && !pathname.startsWith('/api/auth/callback')
  ) {
    return NextResponse.next();
  }

  // Excluir assets estáticos
  if (
    pathname.match(/\.(ico|png|jpg|jpeg|gif|svg|css|js|woff|woff2)$/)
  ) {
    return NextResponse.next();
  }

  // Si estamos en el callback, permitir (el API route maneja el intercambio)
  if (pathname === '/api/auth/callback') {
    return NextResponse.next();
  }

  // Si hay code en la URL (en otra ruta), redirigir al callback para intercambiar por tokens
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
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};

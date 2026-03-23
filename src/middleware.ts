/**
 * Middleware de validación de sesión Cognito
 * - /login: permitido sin sesión
 * - Si hay ?code= en URL: permitir (react-oidc-context procesa el callback en cliente)
 * - Si no hay cookie de sesión: redirigir a /login
 * - Si hay cookie de sesión: permitir acceso
 */

import { NextRequest, NextResponse } from 'next/server';

const COOKIE_NAME = 'cognito_session';

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  if (pathname.startsWith('/_next')) {
    return NextResponse.next();
  }

  if (pathname.match(/\.(ico|png|jpg|jpeg|gif|svg|css|js|woff|woff2)$/)) {
    return NextResponse.next();
  }

  if (pathname === '/api/auth/callback') {
    return NextResponse.next();
  }

  if (pathname === '/api/auth/logout') {
    return NextResponse.next();
  }

  if (pathname === '/api/auth/sync-session') {
    return NextResponse.next();
  }

  if (pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  // /login: permitir sin sesión
  if (pathname === '/login') {
    return NextResponse.next();
  }

  // Si hay code en URL: Cognito redirigió tras login, react-oidc-context procesará en cliente
  const code = searchParams.get('code');
  if (code) {
    return NextResponse.next();
  }

  // Verificar cookie de sesión
  const sessionCookie = request.cookies.get(COOKIE_NAME);
  if (!sessionCookie?.value) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};

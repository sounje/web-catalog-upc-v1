/**
 * Middleware - validación de sesión desactivada temporalmente
 * - Si hay ?code= en URL: redirige a /api/auth/callback para intercambiar por tokens
 * - En consola imprime los datos de la cookie cognito_session (si existe)
 * - Permite el acceso sin validar sesión
 */

import { NextRequest, NextResponse } from 'next/server';

const COOKIE_NAME = 'cognito_session';

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

  // Imprimir datos de la cookie en consola (servidor - terminal donde corre next dev)
  const sessionCookie = request.cookies.get(COOKIE_NAME);
  if (sessionCookie?.value) {
    try {
      const decoded = atob(sessionCookie.value);
      const sessionData = JSON.parse(decoded);
      console.log('[Middleware] Cookie cognito_session:', sessionData);
    } catch {
      console.log('[Middleware] Cookie cognito_session (raw):', sessionCookie.value);
    }
  } else {
    console.log('[Middleware] No hay cookie cognito_session');
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};

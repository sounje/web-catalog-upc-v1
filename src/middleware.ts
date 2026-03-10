/**
 * Middleware - Flujo client-side con react-oidc-context
 * La sesión se gestiona en el cliente (localStorage). No se usan cookies ni redirecciones.
 * El code OAuth debe llegar a la página (/) para que react-oidc-context lo procese.
 * Se permite el paso de todas las rutas; AuthGuard en el cliente protege el contenido.
 */

import { NextRequest, NextResponse } from 'next/server';

export function middleware(_request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};

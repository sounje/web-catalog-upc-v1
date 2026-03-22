/**
 * Middleware - sin validación de sesión ni redirecciones
 * Permite el acceso a todas las rutas sin comprobar autenticación
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(_request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};

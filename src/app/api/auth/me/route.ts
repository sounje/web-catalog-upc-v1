/**
 * API Route para obtener datos del usuario autenticado desde la cookie de sesión
 */

import { NextRequest, NextResponse } from 'next/server';

const COOKIE_NAME = 'cognito_session';

/** Decodifica el payload de un JWT (sin verificar firma, solo para lectura de claims) */
function decodeJwtPayload(token: string): Record<string, unknown> | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const payload = parts[1];
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const json = Buffer.from(base64, 'base64').toString('utf-8');
    return JSON.parse(json) as Record<string, unknown>;
  } catch {
    return null;
  }
}

export async function GET(request: NextRequest) {
  const sessionCookie = request.cookies.get(COOKIE_NAME);
  if (!sessionCookie?.value) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  try {
    const sessionData = JSON.parse(
      Buffer.from(sessionCookie.value, 'base64').toString('utf-8')
    );
    const idToken = sessionData.id_token as string;
    if (!idToken) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const payload = decodeJwtPayload(idToken);
    if (!payload) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    return NextResponse.json({
      authenticated: true,
      email: payload.email as string | undefined,
      sub: payload.sub as string | undefined,
    });
  } catch {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}

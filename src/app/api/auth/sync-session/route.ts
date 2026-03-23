/**
 * API Route para sincronizar tokens de react-oidc-context a cookie cognito_session
 * Llamada desde el cliente tras un login exitoso para que el middleware valide la sesión
 */

import { NextRequest, NextResponse } from 'next/server';

const COOKIE_NAME = 'cognito_session';
const COOKIE_MAX_AGE = 60 * 60 * 24; // 24 horas

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { access_token, id_token, refresh_token, expires_in } = body;

    if (!access_token || !id_token) {
      return NextResponse.json(
        { error: 'access_token e id_token son requeridos' },
        { status: 400 }
      );
    }

    const sessionData = JSON.stringify({
      access_token,
      id_token,
      refresh_token: refresh_token ?? null,
      expires_in: expires_in ?? 3600,
    });
    const cookieValue = Buffer.from(sessionData, 'utf-8').toString('base64');

    const isProduction = process.env.NODE_ENV === 'production';
    const response = NextResponse.json({ ok: true });
    response.cookies.set(COOKIE_NAME, cookieValue, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax',
      maxAge: COOKIE_MAX_AGE,
      path: '/',
    });

    return response;
  } catch {
    return NextResponse.json({ error: 'Error al sincronizar sesión' }, { status: 500 });
  }
}

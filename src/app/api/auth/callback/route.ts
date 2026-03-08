/**
 * API Route para intercambio de código OAuth por tokens de Cognito
 * Recibe el code de la URL, lo intercambia con Cognito y guarda los tokens en cookie
 */

import { NextRequest, NextResponse } from 'next/server';

const COOKIE_NAME = 'cognito_session';
const COOKIE_MAX_AGE = 60 * 60 * 24; // 24 horas

interface CognitoTokenResponse {
  access_token: string;
  id_token: string;
  refresh_token?: string;
  expires_in: number;
  token_type: string;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  const cognitoDomain = process.env.COGNITO_DOMAIN;
  const clientId = process.env.COGNITO_CLIENT_ID;
  const redirectUri = process.env.COGNITO_REDIRECT_URI;
  const clientSecret = process.env.COGNITO_CLIENT_SECRET;
  const authRedirectUnauthorized =
    process.env.AUTH_REDIRECT_UNAUTHORIZED || 'http://localhost:3001/';

  if (!code) {
    return NextResponse.redirect(authRedirectUnauthorized);
  }

  if (!cognitoDomain || !clientId || !redirectUri) {
    console.error('Configuración Cognito incompleta');
    return NextResponse.redirect(authRedirectUnauthorized);
  }

  const tokenUrl = `${cognitoDomain}/oauth2/token`;

  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    client_id: clientId,
    code,
    redirect_uri: redirectUri,
  });

  if (clientSecret) {
    body.append('client_secret', clientSecret);
  }

  try {
    const response = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: body.toString(),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Error Cognito token exchange:', response.status, errorData);
      localStorage.setItem('cognito_error', `Status: ${response.status}, Response: ${errorData}`);
      return false;//NextResponse.redirect(authRedirectUnauthorized);
    }

    const tokens: CognitoTokenResponse = await response.json();

    const sessionData = JSON.stringify({
      access_token: tokens.access_token,
      id_token: tokens.id_token,
      refresh_token: tokens.refresh_token,
      expires_in: tokens.expires_in,
    });
    const cookieValue = Buffer.from(sessionData, 'utf-8').toString('base64');

    const isProduction = process.env.NODE_ENV === 'production';
    const baseUrl = request.nextUrl.origin;
    const redirectResponse = NextResponse.redirect(new URL('/', baseUrl), 302);

    redirectResponse.cookies.set(COOKIE_NAME, cookieValue, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax',
      maxAge: COOKIE_MAX_AGE,
      path: '/',
    });

    return redirectResponse;
  } catch (error) {
    console.error('Error en intercambio de tokens:', error);
    return false;//NextResponse.redirect(authRedirectUnauthorized);
  }
}

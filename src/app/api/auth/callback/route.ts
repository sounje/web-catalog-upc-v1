/**
 * API Route para validar e intercambiar código OAuth por tokens de Cognito
 * Solo valida y registra resultado/errores en consola (sin redirecciones ni cookies)
 */

import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  const cognitoDomain = process.env.COGNITO_DOMAIN;
  const clientId = process.env.COGNITO_CLIENT_ID;
  const redirectUri = process.env.COGNITO_REDIRECT_URI;
  const clientSecret = process.env.COGNITO_CLIENT_SECRET;

  if (!code) {
    console.error('[Auth Callback] No se recibió el parámetro code en la URL');
    return NextResponse.json({ ok: false, error: 'No code provided' }, { status: 400 });
  }

  if (!cognitoDomain || !clientId || !redirectUri) {
    console.error('[Auth Callback] Configuración Cognito incompleta:', {
      cognitoDomain: !!cognitoDomain,
      clientId: !!clientId,
      redirectUri: !!redirectUri,
    });
    return NextResponse.json(
      { ok: false, error: 'Configuración Cognito incompleta' },
      { status: 500 }
    );
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
    console.log('[Auth Callback] Intercambiando código por tokens...', {
      redirect_uri: redirectUri,
      token_url: tokenUrl,
    });

    const response = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: body.toString(),
    });

    const responseText = await response.text();

    if (!response.ok) {
      console.error('[Auth Callback] Error Cognito:', response.status, responseText);
      return NextResponse.json(
        { ok: false, error: 'Token exchange failed', details: responseText },
        { status: response.status }
      );
    }

    const tokens = JSON.parse(responseText);
    console.log('[Auth Callback] Éxito. Tokens recibidos:', {
      has_access_token: !!tokens.access_token,
      has_id_token: !!tokens.id_token,
      has_refresh_token: !!tokens.refresh_token,
      expires_in: tokens.expires_in,
    });

    return NextResponse.json({ ok: true, message: 'Validación exitosa. Ver consola del servidor.' });
  } catch (error) {
    console.error('[Auth Callback] Error en intercambio de tokens:', error);
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : 'Error desconocido',
      },
      { status: 500 }
    );
  }
}

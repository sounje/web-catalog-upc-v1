/**
 * API Route para intercambio de código OAuth por tokens de Cognito
 * - En ERROR: devuelve JSON con detalles del error, sin redireccionar
 * - En ÉXITO: devuelve página con datos de la respuesta y cookie establecida
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

/** Genera HTML para mostrar respuesta (éxito o error) sin redireccionar */
function buildResponsePage(
  type: 'success' | 'error',
  title: string,
  data: Record<string, unknown>
): string {
  const dataStr = JSON.stringify(data, null, 2);
  const bg = type === 'success' ? '#22c55e' : '#ef4444';
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>${title}</title></head>
<body style="font-family:sans-serif;padding:2rem;background:${bg}15;max-width:800px;margin:auto;">
  <h1 style="color:${type === 'success' ? '#15803d' : '#b91c1c'};">${title}</h1>
  <pre style="background:#1e293b;color:#e2e8f0;padding:1rem;border-radius:8px;overflow:auto;font-size:13px;">${dataStr.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>
  ${type === 'success' ? '<p><a href="/" style="color:#15803d;font-weight:bold;">→ Ir al catálogo</a></p>' : ''}
</body>
</html>`;
}

export async function GET(request: NextRequest) {
  const { searchParams, origin, pathname } = new URL(request.url);
  const code = searchParams.get('code');

  const incomingRequestHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => {
    incomingRequestHeaders[key] = value;
  });

  const incomingRequestInfo = {
    method: request.method,
    url: request.url,
    origin,
    pathname,
    searchParams: Object.fromEntries(searchParams.entries()),
    headers: incomingRequestHeaders,
  };

  const cognitoDomain = process.env.REACT_APP_COGNITO_DOMAIN;
  const clientId = process.env.REACT_APP_COGNITO_CLIENT_ID;
  const redirectUri = process.env.REACT_APP_COGNITO_REDIRECT_URI;
  const clientSecret = process.env.REACT_APP_COGNITO_CLIENT_SECRET;

  if (!code) {
    const errorData = {
      error: true,
      message: 'Falta el parámetro code en la URL',
      code: null,
      incomingRequest: incomingRequestInfo,
    };
    return new NextResponse(buildResponsePage('error', 'Error: sin code', errorData), {
      status: 200,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  }

  if (!cognitoDomain || !clientId || !redirectUri) {
    const errorData = {
      error: true,
      message: 'Configuración Cognito incompleta en variables de entorno',
      config: { cognitoDomain: !!cognitoDomain, clientId: !!clientId, redirectUri: !!redirectUri },
      incomingRequest: incomingRequestInfo,
    };
    console.error('[Auth Callback]', errorData);
    return new NextResponse(buildResponsePage('error', 'Error: configuración incompleta', errorData), {
      status: 200,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
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

  const requestHeaders: Record<string, string> = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  const requestBodyStr = body.toString();
  const requestInfo = {
    method: 'POST',
    url: tokenUrl,
    headers: requestHeaders,
    body: requestBodyStr,
    bodyParsed: Object.fromEntries(body.entries()),
  };

  try {
    const response = await fetch(tokenUrl, {
      method: 'POST',
      headers: requestHeaders,
      body: requestBodyStr,
    });

    const responseText = await response.text();

    const cognitoResponseHeaders: Record<string, string> = {};
    response.headers.forEach((value, key) => {
      cognitoResponseHeaders[key] = value;
    });

    if (!response.ok) {
      let parsedError: unknown;
      try {
        parsedError = JSON.parse(responseText);
      } catch {
        parsedError = responseText;
      }
      const errorData = {
        error: true,
        message: 'Cognito /oauth2/token rechazó la petición',
        incomingRequest: incomingRequestInfo,
        requestToCognito: requestInfo,
        cognitoResponse: {
          status: response.status,
          statusText: response.statusText,
          headers: cognitoResponseHeaders,
          body: parsedError,
        },
      };
      console.error('[Auth Callback] Error Cognito:', errorData);
      return new NextResponse(buildResponsePage('error', 'Error: intercambio de tokens falló', errorData), {
        status: 200,
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      });
    }

    let tokens: CognitoTokenResponse;
    try {
      tokens = JSON.parse(responseText);
    } catch {
      const parseError = {
        error: true,
        message: 'La respuesta de Cognito no es JSON válido',
        rawResponse: responseText.slice(0, 500),
        incomingRequest: incomingRequestInfo,
        requestToCognito: requestInfo,
        cognitoResponseHeaders,
      };
      return new NextResponse(buildResponsePage('error', 'Error: respuesta inválida', parseError), {
        status: 200,
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      });
    }

    const sessionData = JSON.stringify({
      access_token: tokens.access_token,
      id_token: tokens.id_token,
      refresh_token: tokens.refresh_token,
      expires_in: tokens.expires_in,
    });
    const cookieValue = Buffer.from(sessionData, 'utf-8').toString('base64');

    const isProduction = process.env.NODE_ENV === 'production';

    const maskToken = (t: string | undefined) =>
      t ? `${t.slice(0, 20)}...${t.slice(-10)}` : null;

    const successData = {
      success: true,
      message: 'Tokens recibidos correctamente de Cognito',
      incomingRequest: incomingRequestInfo,
      requestToCognito: requestInfo,
      cognitoResponse: {
        status: response.status,
        statusText: response.statusText,
        headers: cognitoResponseHeaders,
        tokens: {
          access_token: maskToken(tokens.access_token),
          id_token: maskToken(tokens.id_token),
          refresh_token: maskToken(tokens.refresh_token),
          expires_in: tokens.expires_in,
          token_type: tokens.token_type,
        },
      },
      cookieEstablecida: true,
    };

    const html = buildResponsePage('success', 'Autenticación exitosa', successData);
    const htmlResponse = new NextResponse(html, {
      status: 200,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });

    htmlResponse.cookies.set(COOKIE_NAME, cookieValue, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax',
      maxAge: COOKIE_MAX_AGE,
      path: '/',
    });

    return htmlResponse;
  } catch (error) {
    const errorData = {
      error: true,
      message: 'Excepción al intercambiar tokens',
      incomingRequest: incomingRequestInfo,
      requestToCognito: requestInfo,
      detalle: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    };
    console.error('[Auth Callback] Excepción:', error);
    return new NextResponse(buildResponsePage('error', 'Error: excepción en callback', errorData), {
      status: 200,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  }
}

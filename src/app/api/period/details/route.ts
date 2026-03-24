/**
 * API Route para obtener detalles del periodo
 * Oculta el endpoint real del cliente y maneja la comunicación con el backend
 */

import { NextRequest, NextResponse } from 'next/server';
import https from 'https';
import type { ApiPeriodDetailsResponse } from '@/features/courses/types';

// API_ENDPOINT_PERIOD_DETAILS ahora contiene la URL completa del endpoint
const API_ENDPOINT = process.env.API_ENDPOINT_PERIOD_DETAILS || 'http://localhost:8080/dev/GetDetailsPeriod';

// Agente HTTPS que ignora certificados auto-firmados (solo para desarrollo)
const httpsAgent = new https.Agent({
  rejectUnauthorized: false
});

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization') ?? undefined;
    const headers: Record<string, string> = { Accept: 'application/json' };
    if (authHeader) headers.Authorization = authHeader;

    // Log de API consumida
    console.log('--- API_ENDPOINT_PERIOD_DETAILS (GetDetailsPeriod) ---');
    console.log('API consumida:', API_ENDPOINT);
    console.log('Method: GET');
    console.log('Headers:', JSON.stringify(headers, null, 2));
    console.log('----------------------------------------');

    const response = await fetch(API_ENDPOINT, {
      method: 'GET',
      headers,
      // @ts-expect-error - Node.js fetch acepta agent pero TypeScript no lo reconoce
      agent: API_ENDPOINT.startsWith('https') ? httpsAgent : undefined,
    });

    const rawBody = await response.text();
    let backendBody: unknown;
    try {
      backendBody = rawBody ? JSON.parse(rawBody) : null;
    } catch {
      backendBody = rawBody;
    }

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          error: 'Error en API externa (capa 2)',
          message: `API externa respondió con status ${response.status}`,
          backendStatus: response.status,
          backendBody,
        },
        { status: response.status }
      );
    }

    const data: ApiPeriodDetailsResponse | null = backendBody as ApiPeriodDetailsResponse | null;

    // La API puede retornar null en caso de error
    if (data === null) {
      console.error('La API retornó null');
      return NextResponse.json(
        { 
          success: false,
          error: 'La API retornó null',
          data: null
        },
        { status: 500 }
      );
    }

    console.log(`Detalles del periodo obtenidos: Semestre ${data.Semestre}, Año ${data.Fecha}`);

    // Retornar los datos al cliente
    return NextResponse.json({
      success: true,
      data,
    });

  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Error desconocido';
    const backendBody = error instanceof Error ? { name: error.name, message: error.message } : String(error);
    return NextResponse.json(
      {
        success: false,
        error: 'Error en API externa (capa 2)',
        message: msg,
        backendStatus: 500,
        backendBody,
        data: null,
      },
      { status: 500 }
    );
  }
}

// Manejar otros métodos HTTP
export async function POST() {
  return NextResponse.json(
    { error: 'Método no permitido. Use GET.' },
    { status: 405 }
  );
}


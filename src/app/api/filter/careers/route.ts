/**
 * API Route para obtener carreras por facultad
 * Oculta el endpoint real del cliente y maneja la comunicación con el backend
 */

import { NextRequest, NextResponse } from 'next/server';
import https from 'https';
import type { ApiCareerResponse } from '@/features/courses/types';

// API_ENDPOINT_CBO_CARRERA_POR_FACULTAD ahora contiene la URL completa del endpoint
const API_ENDPOINT = process.env.API_ENDPOINT_CBO_CARRERA_POR_FACULTAD || 'http://localhost:5216/Filter/GetCareers';
// Agente HTTPS que ignora certificados auto-firmados (solo para desarrollo)
const httpsAgent = new https.Agent({
  rejectUnauthorized: false
});

export async function POST(request: NextRequest) {
  try {
    // Obtener el body de la request (GUID de la facultad)
    const facultyId = await request.json();
    
    // Validar que se proporcione el ID de la facultad
    if (!facultyId || typeof facultyId !== 'string') {
      return NextResponse.json(
        { 
          success: false,
          error: 'ID de facultad es requerido',
          data: []
        },
        { status: 400 }
      );
    }
    const urlWithParam = `${API_ENDPOINT.replace(/\/$/, '')}/${facultyId}`;
    const authHeader = request.headers.get('authorization') ?? undefined;
    const headers: Record<string, string> = { Accept: 'application/json' };
    if (authHeader) headers.Authorization = authHeader;

    // Log de API consumida
    console.log('--- API_ENDPOINT_CBO_CARRERA_POR_FACULTAD (GetCareers) ---');
    console.log('API consumida:', urlWithParam);
    console.log('Method: GET');
    console.log('Headers:', JSON.stringify(headers, null, 2));
    console.log('Param (facultyId):', facultyId);
    console.log('----------------------------------------');

    const response = await fetch(urlWithParam, {
      method: 'GET',
      headers,
      // @ts-expect-error - Node.js fetch acepta agent pero TypeScript no lo reconoce
      agent: API_ENDPOINT.startsWith('https') ? httpsAgent : undefined,
    });

    const rawBody = await response.text();
    let rawData: unknown;
    try {
      rawData = rawBody ? JSON.parse(rawBody) : null;
    } catch {
      rawData = rawBody;
    }

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          error: 'Error en API externa (capa 2)',
          message: `API externa respondió con status ${response.status}`,
          backendStatus: response.status,
          backendBody: rawData,
          data: [],
        },
        { status: response.status }
      );
    }

    // La API puede retornar null en caso de error
    if (rawData === null) {
      console.error('La API retornó null');
      return NextResponse.json({
        success: true,
        data: [],
        count: 0,
      });
    }

    // La API AWS retorna Id/Name (PascalCase), normalizar a id/name (camelCase) para el frontend
    const arr = Array.isArray(rawData) ? rawData : [];
    const data: ApiCareerResponse[] = arr.map((item: { Id?: string; id?: string; Name?: string; name?: string }) => ({
      id: item.id ?? item.Id ?? '',
      name: item.name ?? item.Name ?? '',
    }));

    console.log(`Carreras obtenidas: ${data.length}`);

    // Retornar los datos al cliente
    return NextResponse.json({
      success: true,
      data,
      count: data.length,
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
        data: [],
      },
      { status: 500 }
    );
  }
}

// Manejar método GET (no permitido)
export async function GET() {
  return NextResponse.json(
    { error: 'Método no permitido. Use POST.' },
    { status: 405 }
  );
}


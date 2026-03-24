/**
 * API Route para obtener listado de facultades
 * Oculta el endpoint real del cliente y maneja la comunicación con el backend
 */

import { NextRequest, NextResponse } from 'next/server';
import https from 'https';
import type { ApiFacultyResponse } from '@/features/courses/types';

// API_ENDPOINT_CBO_FACULTADES ahora contiene la URL completa del endpoint
const API_ENDPOINT = process.env.API_ENDPOINT_CBO_FACULTADES || 'http://localhost:5216/api/Filter/GetFaculties';

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
    console.log('--- API_ENDPOINT_CBO_FACULTADES (GetAllFaculties) ---');
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

    if (!response.ok) {
      throw new Error(`Backend responded with status: ${response.status}`);
    }

    const rawData = await response.json();

    // Log del response para debugging
    console.log('API_ENDPOINT_CBO_FACULTADES - Response:', JSON.stringify(rawData, null, 2));

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
    const isArray = Array.isArray(rawData);
    const data: ApiFacultyResponse[] = (isArray ? rawData : []).map((item: { Id?: string; id?: string; Name?: string; name?: string }) => ({
      id: item.id ?? item.Id ?? '',
      name: item.name ?? item.Name ?? '',
    }));

    console.log(`Facultades obtenidas: ${data.length}`);

    // Retornar los datos al cliente
    return NextResponse.json({
      success: true,
      data,
      count: data.length,
    });

  } catch (error) {
    console.error('Error al obtener facultades:', error);
    
    return NextResponse.json(
      { 
        success: false,
        error: 'Error al obtener facultades',
        message: error instanceof Error ? error.message : 'Error desconocido',
        data: []
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


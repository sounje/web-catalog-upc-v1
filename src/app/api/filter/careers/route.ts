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

    const response = await fetch(urlWithParam, {
      method: 'GET',
      headers,
      // @ts-expect-error - Node.js fetch acepta agent pero TypeScript no lo reconoce
      agent: API_ENDPOINT.startsWith('https') ? httpsAgent : undefined,
    });

    if (!response.ok) {
      throw new Error(`Backend responded with status: ${response.status}`);
    }

    const rawData = await response.json();

    // La API puede retornar null en caso de error
    if (rawData === null) {
      return NextResponse.json({
        success: true,
        data: [],
        count: 0,
      });
    }

    // La API AWS retorna Id/Name (PascalCase), normalizar a id/name (camelCase) para el frontend
    const isArray = Array.isArray(rawData);
    const data: ApiCareerResponse[] = (isArray ? rawData : []).map((item: { Id?: string; id?: string; Name?: string; name?: string }) => ({
      id: item.id ?? item.Id ?? '',
      name: item.name ?? item.Name ?? '',
    }));


    return NextResponse.json({
      success: true,
      data,
      count: data.length,
    });

  } catch (error) {
    return NextResponse.json(
      { 
        success: false,
        error: 'Error al obtener carreras',
        message: error instanceof Error ? error.message : 'Error desconocido',
        data: []
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


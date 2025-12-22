/**
 * API Route para obtener carreras por facultad
 * Oculta el endpoint real del cliente y maneja la comunicación con el backend
 */

import { NextRequest, NextResponse } from 'next/server';
import https from 'https';
import type { ApiCareerResponse } from '@/features/courses/types';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:5216';
const API_ENDPOINT_CBO_CARRERA_POR_FACULTAD = process.env.API_ENDPOINT_CBO_CARRERA_POR_FACULTAD || 'Filter/GetCareers';
const API_ENDPOINT = BACKEND_URL + API_ENDPOINT_CBO_CARRERA_POR_FACULTAD;
// Agente HTTPS que ignora certificados auto-firmados (solo para desarrollo)
const httpsAgent = new https.Agent({
  rejectUnauthorized: false
});

export async function POST(request: NextRequest) {
  try {
    // Obtener el body de la request (GUID de la facultad)
    const facultyId = await request.json();
    
    console.log('Solicitando carreras para facultad:', facultyId);
    console.log('Endpoint:', API_ENDPOINT);
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
    const objectBody = { "id": facultyId };
    // Realizar la petición al backend
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(objectBody),
      // @ts-expect-error - Node.js fetch acepta agent pero TypeScript no lo reconoce
      agent: API_ENDPOINT.startsWith('https') ? httpsAgent : undefined,
    });

    if (!response.ok) {
      throw new Error(`Backend responded with status: ${response.status}`);
    }

    const data: ApiCareerResponse[] | null = await response.json();

    // La API puede retornar null en caso de error
    if (data === null) {
      console.error('La API retornó null');
      return NextResponse.json({
        success: true,
        data: [],
        count: 0,
      });
    }

    console.log(`Carreras obtenidas: ${data.length}`);

    // Retornar los datos al cliente
    return NextResponse.json({
      success: true,
      data,
      count: data.length,
    });

  } catch (error) {
    console.error('Error al obtener carreras:', error);
    
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


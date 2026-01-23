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

export async function GET() {
  try {
    console.log('Solicitando facultades desde:', API_ENDPOINT);
    
    // Realizar la petición al backend
    const response = await fetch(API_ENDPOINT, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      // @ts-expect-error - Node.js fetch acepta agent pero TypeScript no lo reconoce
      agent: API_ENDPOINT.startsWith('https') ? httpsAgent : undefined,
    });

    if (!response.ok) {
      throw new Error(`Backend responded with status: ${response.status}`);
    }

    const data: ApiFacultyResponse[] | null = await response.json();

    // La API puede retornar null en caso de error
    if (data === null) {
      console.error('La API retornó null');
      return NextResponse.json({
        success: true,
        data: [],
        count: 0,
      });
    }

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


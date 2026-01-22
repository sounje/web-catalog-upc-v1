/**
 * API Route para obtener detalles del periodo
 * Oculta el endpoint real del cliente y maneja la comunicación con el backend
 */

import { NextRequest, NextResponse } from 'next/server';
import https from 'https';
import type { ApiPeriodDetailsResponse } from '@/features/courses/types';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8080';
//const BACKEND_URL = 'http://localhost:8080';

const API_ENDPOINT_PERIOD_DETAILS = process.env.API_ENDPOINT_PERIOD_DETAILS || 'dev/GetDetailsPeriod';
// Asegurar que haya un solo / entre BACKEND_URL y el endpoint
const API_ENDPOINT = `${BACKEND_URL.replace(/\/$/, '')}/${API_ENDPOINT_PERIOD_DETAILS}`;

// Agente HTTPS que ignora certificados auto-firmados (solo para desarrollo)
const httpsAgent = new https.Agent({
  rejectUnauthorized: false
});

export async function GET() {
  try {
    console.log('Solicitando detalles del periodo desde:', API_ENDPOINT);
    
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

    const data: ApiPeriodDetailsResponse | null = await response.json();

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
    console.error('Error al obtener detalles del periodo:', error);
    
    return NextResponse.json(
      { 
        success: false,
        error: 'Error al obtener detalles del periodo',
        message: error instanceof Error ? error.message : 'Error desconocido',
        data: null
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


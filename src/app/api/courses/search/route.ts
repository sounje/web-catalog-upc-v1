/**
 * API Route para búsqueda de cursos
 * Oculta el endpoint real del cliente y maneja la comunicación con el backend
 */

import { NextRequest, NextResponse } from 'next/server';
import type { ApiCourseRequest, ApiCourseResponse } from '@/features/courses/types';

const BACKEND_URL = process.env.BACKEND_URL ;
const API_ENDPOINT = `${BACKEND_URL}api/curso/consultar-cursor`;

export async function POST(request: NextRequest) {
  try {
    // Obtener el body de la request
    const body = await request.json();
    console.log(body);
    console.log(API_ENDPOINT);
    
    // Validar que tenga la estructura correcta
    if (!body.filter) {
      return NextResponse.json(
        { error: 'Filtro requerido' },
        { status: 400 }
      );
    }

    // Realizar la petición al backend
    const response = await fetch(API_ENDPOINT, {
      method: 'POST', // Según el contrato actualizado de la API
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Backend responded with status: ${response.status}`);
    }

    const data: ApiCourseResponse[] = await response.json();

    // Retornar los datos al cliente
    return NextResponse.json({
      success: true,
      data,
      count: data.length,
    });

  } catch (error) {
    console.error('Error en búsqueda de cursos:', error);
    
    return NextResponse.json(
      { 
        error: 'Error interno del servidor',
        message: error instanceof Error ? error.message : 'Error desconocido'
      },
      { status: 500 }
    );
  }
}

// Manejar método GET (para testing)
export async function GET() {
  return NextResponse.json(
    { error: 'Método no permitido. Use POST.' },
    { status: 405 }
  );
}

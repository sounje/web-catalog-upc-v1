/**
 * API Route para búsqueda de cursos
 * Oculta el endpoint real del cliente y maneja la comunicación con el backend
 */

import { NextRequest, NextResponse } from 'next/server';
import https from 'https';
import http from 'http';
import type { ApiCourseResponse } from '@/features/courses/types';

// REACT_APP_API_ENDPOINT_CONSULTA_CURSO ahora contiene la URL completa del endpoint
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT_CONSULTA_CURSO || 'http://localhost:5216/test/CursosSearch/GetCursosBySearch';

// Agente HTTPS que ignora certificados auto-firmados (solo para desarrollo)
const httpsAgent = new https.Agent({
  rejectUnauthorized: false
});

/**
 * Realiza una petición GET con body usando el módulo nativo https/http.
 * fetch() no permite body en GET; https.request() sí.
 */
function fetchGetWithBody(url: string, body: object): Promise<{ statusCode: number; data: ApiCourseResponse[] }> {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(url);
    const isHttps = parsedUrl.protocol === 'https:';
    const requestBody = JSON.stringify(body);

    const options = {
      hostname: parsedUrl.hostname,
      port: parsedUrl.port || (isHttps ? 443 : 80),
      path: parsedUrl.pathname + parsedUrl.search,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(requestBody),
      },
      ...(isHttps && { agent: httpsAgent }),
    };

    const lib = isHttps ? https : http;
    const req = lib.request(options, (res) => {
      let chunks = '';
      res.on('data', (chunk) => { chunks += chunk; });
      res.on('end', () => {
        try {
          const parsed = JSON.parse(chunks || '[]');
          const data: ApiCourseResponse[] = Array.isArray(parsed)
            ? parsed
            : (parsed?.data ?? parsed?.Data ?? []);
          resolve({ statusCode: res.statusCode ?? 500, data });
        } catch {
          reject(new Error('Respuesta no es JSON válido'));
        }
      });
    });

    req.on('error', reject);
    req.write(requestBody);
    req.end();
  });
}

export async function POST(request: NextRequest) {
  try {
    // Obtener el body de la request
    const body = await request.json();

    // Validar que tenga los campos requeridos
    if (!body.name && !body.facultad && !body.programa) {
      return NextResponse.json(
        { error: 'Al menos un filtro es requerido' },
        { status: 400 }
      );
    }

    // Transformar a PascalCase para la API externa (Name, Facultad, Programa, Nivel, Tipo)
    const apiBody = {
      Name: body.name ?? '',
      Facultad: body.facultad ?? '',
      Programa: body.programa ?? '',
      Nivel: body.nivel ?? '',
      Tipo: body.tipo ?? '',
    };

    // Log del endpoint completo cuando se consume REACT_APP_API_ENDPOINT_CONSULTA_CURSO
    console.log('--- REACT_APP_API_ENDPOINT_CONSULTA_CURSO - Request ---');
    console.log('URL completa:', API_ENDPOINT);
    console.log('Method: GET');
    console.log('Body:', JSON.stringify(apiBody, null, 2));
    console.log('----------------------------------------');

    // GET con body en el request (fetch no lo permite; usamos https.request)
    const { statusCode, data } = await fetchGetWithBody(API_ENDPOINT, apiBody);

    if (statusCode < 200 || statusCode >= 300) {
      throw new Error(`Backend responded with status: ${statusCode}`);
    }

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

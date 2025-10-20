/**
 * ALTERNATIVA: API Route con Query Parameters
 * Usar si el GET con body no funciona
 */

import { NextRequest, NextResponse } from 'next/server';
import type { ApiCourseRequest, ApiCourseResponse } from '@/features/courses/types';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8080';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    if (!body.filter) {
      return NextResponse.json(
        { error: 'Filtro requerido' },
        { status: 400 }
      );
    }

    // Convertir filtros a query parameters
    const { filter } = body;
    const queryParams = new URLSearchParams();
    
    // Agregar parámetros básicos
    if (filter.nameCuse) queryParams.append('nameCuse', filter.nameCuse);
    if (filter.Faculty) queryParams.append('Faculty', filter.Faculty);
    if (filter.program) queryParams.append('program', filter.program);
    
    // Agregar niveles de educación
    if (filter.LevelOfEducation) {
      const { LevelOfEducation } = filter;
      if (LevelOfEducation.PregradoTraditional) queryParams.append('PregradoTraditional', 'true');
      if (LevelOfEducation.PregradoEpe) queryParams.append('PregradoEpe', 'true');
      if (LevelOfEducation.mastery) queryParams.append('mastery', 'true');
    }
    
    // Agregar tipos de curso
    if (filter.TypeCurtse) {
      const { TypeCurtse } = filter;
      if (TypeCurtse.mandatory) queryParams.append('mandatory', 'true');
      if (TypeCurtse.elective) queryParams.append('elective', 'true');
    }

    const API_ENDPOINT = `${BACKEND_URL}/api/curso/consultar-cursor?${queryParams.toString()}`;

    // Realizar la petición al backend con query parameters
    const response = await fetch(API_ENDPOINT, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Backend responded with status: ${response.status}`);
    }

    const data: ApiCourseResponse[] = await response.json();

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

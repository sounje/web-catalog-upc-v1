/**
 * Servicio para comunicación con la API de cursos
 * Solo maneja la comunicación HTTP, el mapeo está separado
 */

import type { Course, CourseFilters } from '@/features/courses/types';
import type { ApiCourseRequest, ApiCourseResponse } from '@/features/courses/types';
import { mapFiltersToApi, mapApiResponseToCourses } from '@/features/courses/mappers';

/**
 * Realiza la búsqueda de cursos en la API
 */
export async function searchCourses(filters: CourseFilters): Promise<Course[]> {
  try {
    // Mapear filtros al formato de la API
    const apiFilters = mapFiltersToApi(filters);
    const requestBody: ApiCourseRequest = { filter: apiFilters };

    // Realizar la petición a nuestra API Route
    const response = await fetch('/api/courses/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`Error en la búsqueda: ${response.status}`);
    }

    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Error en la respuesta de la API');
    }

    // Mapear la respuesta al formato interno
    return mapApiResponseToCourses(result.data);

  } catch (error) {
    console.error('Error en searchCourses:', error);
    throw error;
  }
}

/**
 * Obtiene un curso específico por ID (para futuras funcionalidades)
 */
export async function getCourseById(courseId: string): Promise<Course | null> {
  try {
    const response = await fetch(`/api/courses/${courseId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`Error al obtener curso: ${response.status}`);
    }

    const result = await response.json();
    return result.data;

  } catch (error) {
    console.error('Error en getCourseById:', error);
    throw error;
  }
}
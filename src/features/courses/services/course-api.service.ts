/**
 * Servicio para comunicación con la API de cursos
 * Solo maneja la comunicación HTTP, el mapeo está separado
 */

import type { Course, CourseFilters, ApiFacultyResponse, ApiCareerResponse } from '@/features/courses/types';
import type { ApiCourseRequest } from '@/features/courses/types';
import { mapFiltersToApi, mapApiResponseToCourses } from '@/features/courses/mappers';

/**
 * Realiza la búsqueda de cursos en la API
 */
export async function searchCourses(filters: CourseFilters): Promise<Course[]> {
  try {
    // Mapear filtros al formato de la API
    const requestBody: ApiCourseRequest = mapFiltersToApi(filters);

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

/**
 * Obtiene el listado de todas las facultades disponibles
 * Usa el API Route local como intermediario
 */
export async function getFaculties(): Promise<ApiFacultyResponse[]> {
  try {
    const response = await fetch('/api/filter/faculties', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error al obtener facultades: ${response.status}`);
    }

    const result = await response.json();

    if (!result.success) {
      console.error('Error en la respuesta:', result.error);
      return result.data || [];
    }

    return result.data || [];

  } catch (error) {
    console.error('Error en getFaculties:', error);
    return [];
  }
}

/**
 * Obtiene las carreras asociadas a una facultad específica
 * Usa el API Route local como intermediario
 * @param facultyId - GUID de la facultad
 */
export async function getCareersByFaculty(facultyId: string): Promise<ApiCareerResponse[]> {
  try {
    // Validar que se proporcione un ID
    if (!facultyId) {
      return [];
    }

    const response = await fetch('/api/filter/careers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(facultyId),
    });

    if (!response.ok) {
      throw new Error(`Error al obtener carreras: ${response.status}`);
    }

    const result = await response.json();

    if (!result.success) {
      console.error('Error en la respuesta:', result.error);
      return result.data || [];
    }

    return result.data || [];

  } catch (error) {
    console.error('Error en getCareersByFaculty:', error);
    return [];
  }
}
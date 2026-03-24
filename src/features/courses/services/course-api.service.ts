/**
 * Servicio para comunicación con la API de cursos
 * Solo maneja la comunicación HTTP, el mapeo está separado
 * Inyecta id_token en headers cuando se proporciona (autorización)
 */

import type { Course, CourseFilters, ApiFacultyResponse, ApiCareerResponse, ApiPeriodDetailsResponse } from '@/features/courses/types';
import type { ApiCourseRequest } from '@/features/courses/types';
import { mapFiltersToApi, mapApiResponseToCourses } from '@/features/courses/mappers';

export interface ApiAuthOptions {
  idToken?: string;
}

function authHeaders(idToken?: string): Record<string, string> {
  if (!idToken) return {};
  return { Authorization: `Bearer ${idToken}` };
}

/** Parsea error de la capa 1 cuando la capa 2 falla; muestra el detalle en producción */
async function parseApiError(response: Response, context: string): Promise<never> {
  const rawText = await response.text();
  let errData: { message?: string; error?: string; backendStatus?: number; backendBody?: unknown } = {};
  try {
    errData = rawText ? JSON.parse(rawText) : {};
  } catch {
    errData = { message: rawText || `HTTP ${response.status}` };
  }
  const status = errData.backendStatus ?? response.status;
  const bodyStr = errData.backendBody != null ? JSON.stringify(errData.backendBody) : rawText || '';
  const fullMessage = [
    errData.message ?? errData.error ?? context,
    `[Capa 2] status=${status}`,
    bodyStr ? `body=${bodyStr}` : '',
  ]
    .filter(Boolean)
    .join(' | ');
  throw new Error(fullMessage);
}

/**
 * Realiza la búsqueda de cursos en la API
 */
export async function searchCourses(filters: CourseFilters, options?: ApiAuthOptions): Promise<Course[]> {
  try {
    // Mapear filtros al formato de la API
    const requestBody: ApiCourseRequest = mapFiltersToApi(filters);

    // Realizar la petición a nuestra API Route
    const response = await fetch('/api/courses/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...authHeaders(options?.idToken),
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      await parseApiError(response, 'Error en la búsqueda');
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
export async function getCourseById(courseId: string, options?: ApiAuthOptions): Promise<Course | null> {
  try {
    const response = await fetch(`/api/courses/${courseId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...authHeaders(options?.idToken),
      },
    });

    if (!response.ok) {
      if (response.status === 404) return null;
      await parseApiError(response, 'Error al obtener curso');
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
export async function getFaculties(options?: ApiAuthOptions): Promise<ApiFacultyResponse[]> {
  try {
    const response = await fetch('/api/filter/faculties', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        ...authHeaders(options?.idToken),
      },
    });

    if (!response.ok) {
      await parseApiError(response, 'Error al obtener facultades');
    }

    const result = await response.json();

    if (!result.success) {
      throw new Error(
        result.message ||
          result.error ||
          `[Capa 2] status=${result.backendStatus ?? '?'} | body=${JSON.stringify(result.backendBody ?? result)}`
      );
    }

    return result.data || [];
  } catch (error) {
    console.error('Error en getFaculties:', error);
    throw error;
  }
}

/**
 * Obtiene las carreras asociadas a una facultad específica
 * Usa el API Route local como intermediario
 * @param facultyId - GUID de la facultad
 */
export async function getCareersByFaculty(facultyId: string, options?: ApiAuthOptions): Promise<ApiCareerResponse[]> {
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
        ...authHeaders(options?.idToken),
      },
      body: JSON.stringify(facultyId),
    });

    if (!response.ok) {
      await parseApiError(response, 'Error al obtener carreras');
    }

    const result = await response.json();

    if (!result.success) {
      throw new Error(
        result.message ||
          result.error ||
          `[Capa 2] status=${result.backendStatus ?? '?'} | body=${JSON.stringify(result.backendBody ?? result)}`
      );
    }

    return result.data || [];
  } catch (error) {
    console.error('Error en getCareersByFaculty:', error);
    throw error;
  }
}

/**
 * Obtiene los detalles del periodo actual
 * Usa el API Route local como intermediario
 */
export async function getPeriodDetails(options?: ApiAuthOptions): Promise<ApiPeriodDetailsResponse | null> {
  try {
    const response = await fetch('/api/period/details', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        ...authHeaders(options?.idToken),
      },
    });

    if (!response.ok) {
      await parseApiError(response, 'Error al obtener detalles del periodo');
    }

    const result = await response.json();

    if (!result.success) {
      throw new Error(
        result.message ||
          result.error ||
          `[Capa 2] status=${result.backendStatus ?? '?'} | body=${JSON.stringify(result.backendBody ?? result)}`
      );
    }

    return result.data || null;
  } catch (error) {
    console.error('Error en getPeriodDetails:', error);
    throw error;
  }
}
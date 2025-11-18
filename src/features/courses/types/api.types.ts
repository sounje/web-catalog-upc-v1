/**
 * Tipos e interfaces para la API de cursos UPC
 * Mapeo entre la respuesta de la API y los tipos internos
 */

/**
 * Estructura de la respuesta de la API
 * Actualizado según nueva estructura del backend
 */
export interface ApiCourseResponse {
  id: string;
  code: string;
  course: string;
  career: string;
  credits: number;
  faculty: string;
  tipo: string;
  incoming: string;
  graduate: string;
  requirement: string;
}

/**
 * Filtros que envía la API
 * Nueva estructura actualizada del backend
 */
export interface ApiCourseFilter {
  name: string;       // Término de búsqueda
  facultad: string;   // ID de la facultad (UUID)
  programa: string;   // ID del programa (UUID)
  nivel: string;      // "UAC" | "UFC" | "EMA" | Combinaciones: "UAC-UFC", "UAC-EMA", "UFC-EMA", "UAC-UFC-EMA" | ""
  tipo: string;       // "Obligatorio" | "Electivo" | ""
}

/**
 * Request completo para la API (sin wrapper "filter")
 * Es un alias del ApiCourseFilter ya que tienen la misma estructura
 */
export type ApiCourseRequest = ApiCourseFilter;

/**
 * Mapeo de niveles de enseñanza al formato de la API
 * - pregrado-epe → UAC (Pregrado EPE)
 * - pregrado-tradicional → UFC (Pregrado Tradicional)
 * - maestria → EMA (Escuela de Maestría)
 * 
 * Cuando se seleccionan múltiples niveles, se combinan con guiones:
 * - UAC + UFC → "UAC-UFC"
 * - UAC + EMA → "UAC-EMA"
 * - UFC + EMA → "UFC-EMA"
 * - UAC + UFC + EMA → "UAC-UFC-EMA"
 */
export const TEACHING_LEVEL_MAPPING = {
  'pregrado-epe': 'UAC',
  'pregrado-tradicional': 'UFC',
  'maestria': 'EMA',
} as const;

/**
 * Mapeo de tipos de curso al formato de la API
 */
export const COURSE_TYPE_MAPPING = {
  'obligatorio': 'Obligatorio',
  'electivo': 'Electivo',
} as const;

/**
 * Respuesta de la API de Facultades
 */
export interface ApiFacultyResponse {
  id: string;
  name: string;
}

/**
 * Respuesta de la API de Carreras
 */
export interface ApiCareerResponse {
  id: string;
  name: string;
}
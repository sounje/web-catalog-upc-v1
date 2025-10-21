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
  type: string;
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
  nivel: string;      // "UAC" | "UFC" | "UAC-UFC" | ""
  tipo: string;       // "Obligatorio" | "Electivo" | ""
}

/**
 * Request completo para la API (sin wrapper "filter")
 */
export interface ApiCourseRequest extends ApiCourseFilter {}

/**
 * Mapeo de niveles de enseñanza al formato de la API
 * pregrado-epe → UAC (Pregrado Tradicional)
 * pregrado-tradicional → UFC (Pregrado EPE)
 * Ambos seleccionados → UAC-UFC
 */
export const TEACHING_LEVEL_MAPPING = {
  'pregrado-epe': 'UAC',
  'pregrado-tradicional': 'UFC',
  'postgrado': '', // Postgrado no se envía por ahora
} as const;

/**
 * Mapeo de tipos de curso al formato de la API
 */
export const COURSE_TYPE_MAPPING = {
  'obligatorio': 'Obligatorio',
  'electivo': 'Electivo',
} as const;

/**
 * IDs hardcodeados temporalmente para facultad y programa
 */
export const TEMP_FACULTY_ID = '47B6B785-60BA-4948-B1F5-C39C663F83A7';
export const TEMP_PROGRAM_ID = '167D3B55-3852-4C02-824D-05CAF812712D';

/**
 * Constantes para el sistema de catálogo de cursos
 * Evitando magic strings y numbers según Clean Code
 */

import type { TeachingLevel, CourseType } from '@/features/courses/types';

/**
 * Opciones de nivel de enseñanza
 */
export const TEACHING_LEVEL_OPTIONS: Array<{ value: TeachingLevel; label: string }> = [
  { value: 'pregrado-tradicional', label: 'Pregrado Tradicional' },
  { value: 'pregrado-epe', label: 'Pregrado EPE' },
  { value: 'maestria', label: 'Maestría' },
] as const;

/**
 * Opciones de tipo de curso
 */
export const COURSE_TYPE_OPTIONS: Array<{ value: CourseType; label: string }> = [
  { value: 'obligatorio', label: 'Obligatorio' },
  { value: 'electivo', label: 'Electivo' },
] as const;

/**
 * Configuración de paginación de tabla
 */
export const TABLE_PAGINATION_CONFIG = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [5, 10, 20, 50],
} as const;

/**
 * Colores corporativos UPC
 */
export const UPC_COLORS = {
  PRIMARY_RED: '#dc3545',
  DARK_RED: '#c82333',
  LIGHT_GRAY: '#f8f9fa',
  DARK_GRAY: '#343a40',
} as const;

/**
 * Mensajes de la aplicación
 */
export const MESSAGES = {
  NO_RESULTS: 'No se encontraron cursos que coincidan con los filtros aplicados.',
  LOADING: 'Cargando cursos...',
  ERROR: 'Ocurrió un error al cargar los cursos. Por favor, intenta nuevamente.',
  SEARCH_PLACEHOLDER: 'Ingresa el código o nombre del curso',
  EXPORT_SUCCESS: 'Cursos exportados exitosamente.',
} as const;


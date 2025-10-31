/**
 * Constantes para el sistema de catálogo de cursos
 * Evitando magic strings y numbers según Clean Code
 */

import type { FacultyOption, ProgramOption, TeachingLevel, CourseType } from '@/features/courses/types';

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
 * Opciones de facultades UPC
 */
export const FACULTY_OPTIONS: FacultyOption[] = [
  { value: '', label: 'Seleccionar...' },
  { value: 'Facultad de Derecho', label: 'Facultad de Derecho' },
  { value: 'Facultad de Ingeniería', label: 'Facultad de Ingeniería' },
  { value: 'Facultad de Ciencias Contables', label: 'Facultad de Ciencias Contables' },
  { value: 'Facultad de Letras y Ciencias Humanas', label: 'Facultad de Letras y Ciencias Humanas' },
  { value: 'Facultad de Educación', label: 'Facultad de Educación' },
  { value: 'Facultad de Ciencias Administrativas', label: 'Facultad de Ciencias Administrativas' },
  { value: 'Facultad de Arquitectura', label: 'Facultad de Arquitectura' },
  { value: 'Facultad de Psicología', label: 'Facultad de Psicología' },
  { value: 'Facultad de Ciencias Económicas', label: 'Facultad de Ciencias Económicas' },
  { value: 'Facultad de Filosofía', label: 'Facultad de Filosofía' },
  { value: 'Facultad de Ciencias de la Comunicación', label: 'Facultad de Ciencias de la Comunicación' },
  { value: 'Facultad de Ciencias Sociales', label: 'Facultad de Ciencias Sociales' },
  { value: 'Facultad de Arte y Diseño', label: 'Facultad de Arte y Diseño' },
  { value: 'Facultad de Ciencias', label: 'Facultad de Ciencias' },
  { value: 'Facultad de Medicina Humana', label: 'Facultad de Medicina Humana' },
  { value: 'Facultad de Farmacia y Bioquímica', label: 'Facultad de Farmacia y Bioquímica' },
  { value: 'Facultad de Enfermería', label: 'Facultad de Enfermería' },
  { value: 'Facultad de Odontología', label: 'Facultad de Odontología' },
  { value: 'Facultad de Ciencias Biológicas', label: 'Facultad de Ciencias Biológicas' },
];

/**
 * Opciones de programas académicos
 */
export const PROGRAM_OPTIONS: ProgramOption[] = [
  { value: '', label: 'Seleccionar...' },
  { value: 'Administración', label: 'Administración' },
  { value: 'Ciencias Políticas', label: 'Ciencias Políticas' },
  { value: 'Antropología', label: 'Antropología' },
  { value: 'Medicina', label: 'Medicina' },
  { value: 'Comunicación', label: 'Comunicación' },
  { value: 'Contabilidad', label: 'Contabilidad' },
  { value: 'Ingeniería de Software', label: 'Ingeniería de Software' },
  { value: 'Derecho', label: 'Derecho' },
  { value: 'Ingeniería de Sistemas', label: 'Ingeniería de Sistemas' },
  { value: 'Historia', label: 'Historia' },
  { value: 'Educación', label: 'Educación' },
  { value: 'Marketing', label: 'Marketing' },
  { value: 'Arquitectura', label: 'Arquitectura' },
  { value: 'Psicología', label: 'Psicología' },
  { value: 'Economía', label: 'Economía' },
  { value: 'Filosofía', label: 'Filosofía' },
  { value: 'Ingeniería Eléctrica', label: 'Ingeniería Eléctrica' },
  { value: 'Sociología', label: 'Sociología' },
  { value: 'Diseño', label: 'Diseño' },
  { value: 'Estadística', label: 'Estadística' },
  { value: 'Lingüística', label: 'Lingüística' },
  { value: 'Farmacia', label: 'Farmacia' },
  { value: 'Ingeniería Ambiental', label: 'Ingeniería Ambiental' },
  { value: 'Literatura', label: 'Literatura' },
  { value: 'Ingeniería Industrial', label: 'Ingeniería Industrial' },
  { value: 'Enfermería', label: 'Enfermería' },
  { value: 'Odontología', label: 'Odontología' },
  { value: 'Ciencia Política', label: 'Ciencia Política' },
  { value: 'Biología', label: 'Biología' },
  { value: 'Ingeniería Química', label: 'Ingeniería Química' },
  { value: 'Ingeniería Civil', label: 'Ingeniería Civil' },
  { value: 'Geografía', label: 'Geografía' },
];

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


/**
 * Tipos e interfaces para la API de cursos UPC
 * Mapeo entre la respuesta de la API y los tipos internos
 */

/**
 * Estructura de la respuesta de la API
 */
export interface ApiCourseResponse {
  curseCode: string;
  curseName: string;
  careerName: string;
  facultyName: string;
  credit: number;
  courseTypeName: string;
  carrerCourseDescription?: string;
  graduateProfile?: string;
  requirement?: string;
}

/**
 * Filtros que envía la API
 */
export interface ApiCourseFilter {
  nameCuse: string;
  LevelOfEducation: {
    PregradoTraditional: boolean;
    PregradoEpe: boolean;
    mastery: boolean;
  };
  Faculty: string;
  program: string;
  TypeCurtse: {
    mandatory: boolean;
    elective: boolean;
  };
}

/**
 * Request completo para la API
 */
export interface ApiCourseRequest {
  filter: ApiCourseFilter;
}

/**
 * Mapeo de niveles de enseñanza
 */
export const TEACHING_LEVEL_MAPPING = {
  'pregrado-tradicional': 'PregradoTraditional',
  'pregrado-epe': 'PregradoEpe',
  'postgrado': 'mastery',
} as const;

/**
 * Mapeo de tipos de curso
 */
export const COURSE_TYPE_MAPPING = {
  'obligatorio': 'mandatory',
  'electivo': 'elective',
} as const;

/**
 * Mapeo inverso de tipos de curso
 */
export const COURSE_TYPE_REVERSE_MAPPING = {
  'Obligatorio': 'obligatorio',
  'Electivo': 'electivo',
} as const;

/**
 * Mapeo inverso de niveles de enseñanza
 */
export const TEACHING_LEVEL_REVERSE_MAPPING = {
  'Pregrado Tradicional': 'pregrado-tradicional',
  'Pregrado EPE': 'pregrado-epe',
  'Postgrado': 'postgrado',
} as const;

/**
 * Mapper para convertir datos entre la API y los tipos internos
 * Siguiendo principios de Single Responsibility y Clean Code
 */

import type { Course, CourseFilters } from '@/features/courses/types';
import type { 
  ApiCourseResponse, 
  ApiCourseFilter,
} from '@/features/courses/types';
import { 
  TEACHING_LEVEL_MAPPING,
  COURSE_TYPE_MAPPING,
  TEMP_FACULTY_ID,
  TEMP_PROGRAM_ID
} from '@/features/courses/types';

/**
 * Mapea los filtros del frontend al formato de la API
 * Nueva estructura: { name, facultad, programa, nivel, tipo }
 */
export function mapFiltersToApi(filters: CourseFilters): ApiCourseFilter {
  // Mapear nivel de enseñanza
  const nivel = mapTeachingLevelsToApi(filters.teachingLevels);
  
  // Mapear tipo de curso (radio button - solo uno seleccionado)
  const tipo = filters.courseTypes.length > 0 
    ? COURSE_TYPE_MAPPING[filters.courseTypes[0]] 
    : '';

  return {
    name: filters.searchTerm,
    facultad: TEMP_FACULTY_ID,  // Hardcodeado temporalmente
    programa: TEMP_PROGRAM_ID,  // Hardcodeado temporalmente
    nivel: nivel,
    tipo: tipo,
  };
}

/**
 * Mapea los niveles de enseñanza seleccionados al formato de la API
 * - pregrado-epe → UAC
 * - pregrado-tradicional → UFC
 * - Ambos → UAC-UFC
 * - Ninguno/Postgrado → ""
 */
function mapTeachingLevelsToApi(teachingLevels: string[]): string {
  const hasUAC = teachingLevels.includes('pregrado-epe');
  const hasUFC = teachingLevels.includes('pregrado-tradicional');
  
  if (hasUAC && hasUFC) {
    return 'UAC-UFC';
  } else if (hasUAC) {
    return 'UAC';
  } else if (hasUFC) {
    return 'UFC';
  }
  
  return '';
}

/**
 * Mapea la respuesta de la API al formato interno
 * Actualizado según nueva estructura del backend
 */
export function mapApiResponseToCourse(apiCourse: ApiCourseResponse): Course {
  return {
    id: apiCourse.id, // Ahora la API proporciona el ID directamente
    code: apiCourse.code,
    name: apiCourse.course,
    program: apiCourse.career,
    credits: apiCourse.credits,
    faculty: apiCourse.faculty,
    description: apiCourse.incoming,
    achievement: apiCourse.graduate,
    prerequisites: apiCourse.requirement,
    courseType: mapCourseTypeFromApi(apiCourse.type),
    teachingLevel: mapTeachingLevelFromApi(apiCourse.faculty),
  };
}

/**
 * Mapea múltiples respuestas de la API
 */
export function mapApiResponseToCourses(apiCourses: ApiCourseResponse[]): Course[] {
  return apiCourses.map(mapApiResponseToCourse);
}

/**
 * Genera un ID único para el curso
 */
function generateCourseId(code: string): string {
  return `course-${code.toLowerCase().replace(/\s+/g, '-')}`;
}

/**
 * Mapea el tipo de curso de la API al tipo interno
 * Actualizado para soportar mayúsculas
 */
function mapCourseTypeFromApi(apiType: string): 'obligatorio' | 'electivo' {
  const normalizedType = apiType.toUpperCase();
  
  const mapping: Record<string, 'obligatorio' | 'electivo'> = {
    'OBLIGATORIO': 'obligatorio',
    'ELECTIVO': 'electivo',
  };
  
  return mapping[normalizedType] || 'obligatorio';
}

/**
 * Mapea el nivel de enseñanza basado en la facultad
 * (Esto es una aproximación, idealmente la API debería devolver el nivel)
 */
function mapTeachingLevelFromApi(facultyName: string): 'pregrado-tradicional' | 'pregrado-epe' | 'postgrado' {
  // Lógica simple basada en el nombre de la facultad
  if (facultyName.toLowerCase().includes('postgrado') || facultyName.toLowerCase().includes('maestría')) {
    return 'postgrado';
  }
  
  // Por defecto, asumimos pregrado tradicional
  return 'pregrado-tradicional';
}

/**
 * Mapea un curso interno al formato de la API (para futuras funcionalidades)
 * Actualizado según nueva estructura del backend
 */
export function mapCourseToApi(course: Course): ApiCourseResponse {
  return {
    id: course.id,
    code: course.code,
    course: course.name,
    career: course.program,
    credits: course.credits,
    faculty: course.faculty,
    type: mapCourseTypeToApi(course.courseType),
    incoming: course.description || 'N/A',
    graduate: course.achievement || 'N/A',
    requirement: course.prerequisites || 'N/A',
  };
}

/**
 * Mapea el tipo de curso interno al formato de la API
 * Actualizado para generar mayúsculas
 */
function mapCourseTypeToApi(courseType: 'obligatorio' | 'electivo'): string {
  const mapping: Record<'obligatorio' | 'electivo', string> = {
    'obligatorio': 'OBLIGATORIO',
    'electivo': 'ELECTIVO',
  };
  
  return mapping[courseType];
}
